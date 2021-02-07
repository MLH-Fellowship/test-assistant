import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../config.json'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { Helmet } from 'react-helmet'

import LoadingIndicator from '../modules/LoadingIndicator'
import StoriesList from '../components/StoriesList'
import Navigation from '../components/Navigation'
import UserProfile from '../components/UserProfile'

const Profile = (props) => {
  const { profileId } = props
  const [stories, setStories] = useState([])
  const [user, setUser] = useState('')

  const { promiseInProgress } = usePromiseTracker()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `query {
          user(id: "${profileId}") {
            profilePicture {
              url
            }
            Name
            Bio
            username
            Company
            Profession
            email
            LinkedIn
            Twitter
          }
        }
        `
        },
        {
          withCredentials: true
        }
      )
      setUser(response.data.data.user)
    }
    if (profileId) {
      trackPromise(fetchUserInfo())
    }
  }, [profileId])

  useEffect(() => {
    const fetchMyStories = async () => {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `query {
            user(id: "${profileId}") {
              user_stories {
                id
                Title
                Description
                user_story_status {
                  Status
                }
                followers {
                  username
                }
                product {
                  Name
                }
                author {
                  id
                  username
                }
                user_story_comments {
                  Comments
                }
                Category
              }
            }
          }`
        },
        {
          withCredentials: true
        }
      )
      setStories(response.data.data.user.user_stories)
    }
    trackPromise(fetchMyStories())
  }, [profileId])

  return (
    <>
      <Helmet>
        <title>{`${user.username} | Test Assistant`}</title>
        <meta name='description' content={`${user.Bio}`} />
        <meta name='keywords' content='user story, issue tracker' />
      </Helmet>
      <Navigation />
      {promiseInProgress ? (
        <LoadingIndicator />
      ) : (
        <div className='body-content'>
          <div className='body-wrapper'>
            <div className='flex flex-row flex-space-around'>
              <div className='flex flex-column'>
                <UserProfile user={user} />
              </div>
            </div>
            {
              <div className='flex flex-column'>
                <h3>Projects by this user</h3>
                <StoriesList
                  stories={stories}
                />
              </div>
            }
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
