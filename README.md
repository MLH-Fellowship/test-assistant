## Introduction

- Test Assistant guides you to set up tests for your React application and then helps you to generate a summary using a test results processor. You can then create a new project on the platform and share the test report which will be rendered on your web application dashboard.

- Our main goal is to help you learn and improve your software testing concepts. Test Assistant allows users to collaborate and learn together by interacting with your project via votes and comments. This way you can also get feedback based on your source code and test reports.

## Client setup for Test Assistant

### Starting up the project

- After cloning this repository you will need to install all the dependencies using `npm i`

- Now you need to connect to the Strapi server. To do this, duplicate the file `src/config.json.template` into a new file called `src/config.json` and replace the content of the variable with your server URL.

- Then run: `npm start` to run the app in the development mode.

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- The page will reload if you make edits. You will also see any lint errors in the console.

### JS and SCSS quality assurance

- Before submitting a PR/MR make sure your code is compliant with our JS rules by running: `npm run test:js`. You can format it automatically by running: `npm run format`.

- To make sure your SCSS is compliant run: `npm run test:sass`.

### Build it to ensure it will work on production

- `npm run build` builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

- Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Server setup for Test Assistant

### Use cases

- The `/server` is a dependency to run the Test Assistant. It contains all the models and routes necessary to manage either project independently, or both at the same time consuming the same [Strapi](https://strapi.io/).

- It provides the user interface to manage the project requests received by Test Assistant, and also to manage the table of content and general project configuration.

## How to install it

- Like always, clone this repo. Once cloned and inside the repository's folder install all the dependencies with `npm i`.

- You can configure and enable `cors` middleware by adding your client or origin url in `./config/middleware.js`. To add your domains, duplicate the file `.env.example` into a new file called `.env`, and add your domains to `EOS_CORS_DOMAINS` variable list.


- Now you need to connect to a database. To do this, duplicate the file `.env.example` into a new file called `.env`, and replace the content of the variables as described in the comments. You need to have a DB running before this. We recommend using [Mongo Atlas](https://account.mongodb.com/) or [Mlab](https://mlab.com/). They both offer a free tier with up to 500mb free storage. 

- Now that you have a DB running, you can start up the project by running `npm start`. It will serve a page under http://localhost:1337/admin so you can create your first admin user.

### Test GraphQL calls

Our version of Strapi comes with GraphQL installed so, after you serve the application, you can access the GraphQL playground by visiting http://localhost:1337/graphql.

### Creating new content type

Content types in Strapi are data models with integrated API endpoints and UI inside Strapi. You can create one from the admin very easily, however, everytime you create one, Strapi will be creating a group of documents for the API and route to work appropriately.

This may cause 2 different issues that you need to bear in mind:

- If you are running this application in Heroku, you need to make sure that you include the new changes in your Heroku repository, locally in your machine, and then you push them as part of your regular git process.
Don't attempt to create content-types directly from your application served in Heroku. Heroku will delete all files once it goes to sleep.

- Creating new content-types will also make your repository differ from our master. We suggest using namespaces for your content-type so you increase your compatibility with our master to be able to pull next time again. An example:

Let's say that your project's name is `YOLO`. Instead of creating a content-type `Library` choose a name like `YoloLibrary`.



