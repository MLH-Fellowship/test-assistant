import React, { useState, useEffect, useContext } from 'react'
import { apiURL } from '../config.json'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { Helmet } from 'react-helmet'

import axios from 'axios'

import LoadingIndicator from '../modules/LoadingIndicator'
import Button from '../components/Button'
import StoriesList from '../components/StoriesList'
import Navigation from '../components/Navigation'

import Context from '../modules/Context'
import Login from './Login'

const MyStories = () => {
  const { state } = useContext(Context)

  const [stories, setStories] = useState([])

  const [currentStateSelected, selectState] = useState('My Submissions')

  const { promiseInProgress } = usePromiseTracker()

  const id = localStorage.getItem('id')

  useEffect(() => {
    const fetchMyStories = async () => {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `query {
            userStories(where: { author: "${id}" }) {
              id
              Title
              Description
              followers {
                id
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
              user_story_status {
                Status
              }
              Category
            }
          }`
        },
        {
          withCredentials: true
        }
      )
      setStories(response.data.data.userStories)
    }
    const fetchFollowingStories = async () => {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `query {
            userStories(where: { followers: "${id}" }) {
              id
              Title
              Description
              followers {
                id
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
              user_story_status {
                Status
              }
            }
          }`
        },
        {
          withCredentials: true
        }
      )
      setStories(response.data.data.userStories)
    }
    if (currentStateSelected === 'My Submissions')
      trackPromise(fetchMyStories())
    else trackPromise(fetchFollowingStories())
  }, [currentStateSelected, id])

  return state.auth ? (
    <>
      <Helmet>
        <title>My stories | Test Assistant</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <Navigation />
      <div className='body-content'>
        <div className='body-wrapper my-stories'>
          <h3>My Projects</h3>
          <div className='flex flex-row'>
            <Button
              className={
                currentStateSelected === 'My Submissions'
                  ? 'btn btn-tabs btn-tabs-selected'
                  : 'btn btn-tabs'
              }
              onClick={() => selectState('My Submissions')}
            >
              My Submissions
            </Button>
            &nbsp; &nbsp;
            <Button
              className={
                currentStateSelected === 'Following'
                  ? 'btn btn-tabs btn-tabs-selected'
                  : 'btn btn-tabs'
              }
              onClick={() => selectState('Following')}
            >
              Following
            </Button>
          </div>
          {promiseInProgress ? (
            <LoadingIndicator />
          ) : (
            <div className='flex flex-column'>
              <StoriesList
                stories={stories}
              />
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <Login message='Please login to access your stories' />
  )
}

export default MyStories
