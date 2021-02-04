'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async afterUpdate(result) {
            try {
                if(result.user_story_status.Status === 'Deployed') {
                    let users = result.followers.map(follower => follower.id)
                    if(!users.includes(result.author.id)) {
                        users.push(result.author.id)
                    }
                    await strapi.services['user-story-notification'].create({
                        message: `${result.Title} has been launched`,
                        users: users,
                        seen: false,
                        date: new Date(),
                        link: `story/${result.id}`
                    })
                }
            }
            catch(e) {}
        }
    }
};
