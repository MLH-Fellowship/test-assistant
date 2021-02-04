import React, {
  useState,
  useEffect
} from 'react'
import axios from 'axios'
import { apiURL } from '../config.json'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { Helmet } from 'react-helmet'

import StoriesList from '../components/StoriesList'
import LoadingIndicator from '../modules/LoadingIndicator'
import Navigation from '../components/Navigation'

const Home = () => {

  const [currentStateSelected, selectState] = useState('Under consideration')

  const [stories, setStories] = useState([])

  const [product, setProduct] = useState('All')

  const { promiseInProgress } = usePromiseTracker()

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `query {
            userStories(sort: "createdAt:desc", limit: 5, start: ${
              (1 - 1) * 5
            }, where: {
              user_story_status : {
                Status: "${currentStateSelected}"
              }
            }) {
              id
              Title
              Description
              user_story_status {
                Status
              }
              user_story_comments {
                Comments
              }
              product {
                Name
              }
              author {
                id
                username
              }
              followers {
                id
              }
              Category
            }
          }
          `
        },
        {
          withCredentials: true
        }
      )
      setStories(response.data.data.userStories)
    }
    trackPromise(fetchStories())
  }, [])

  return (
    <>
      <Helmet>
        <title>Home | Test Assistant</title>
        <meta
          name='description'
          content="Share with us how you test your products, relate to other users'
          tests, vote them up, and we'll make sure we deliver cohesive
          solutions that enhance your learning and testing experience."
        />
        <meta
          name='keywords'
          content='feature request, open roadmap, user voice, feature request tracking, issue tracker open source '
        />
      </Helmet>
      <Navigation />
      <div className='body-content'>
        <div className='body-wrapper'>
          <div className='product-introduction'>
            <div>
              <h1>GET STARTED WITH YOUR TESTING JOURNEY</h1>
              <h2 className='subheader'>
                Share with us how you test your products, relate to other users'
                tests, vote them up, and we'll make sure we deliver cohesive
                solutions that enhance your learning and testing experience.
              </h2>
            </div>
            <div className='img-wrap'>
              <img
                className='profile-picture'
                src={require(`../assets/images/user-story-graphic.svg`)}
                alt='profile pic'
              />
            </div>
          </div>
          {promiseInProgress ? (
            <LoadingIndicator />
          ) : (
            <>
              <StoriesList
                stories={stories}
                state={currentStateSelected}
                product={product}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
