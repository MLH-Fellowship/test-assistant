import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../config.json'

const Vote = (props) => {
  const { story } = props

  const userId = localStorage.getItem('id')

  const [followers, setFollowers] = useState([])

  const [votes, setVotes] = useState(story.followers.length)

  const [voteClicked, setVoteClicked] = useState(false)

  const [voted, setVoted] = useState(false)

  useEffect(() => {
    const followerIds = story.followers.map((follower) => follower.id)
    if (followerIds.includes(userId)) {
      setVoted(true)
    }
  }, [story.followers, userId])

  const updateVote = async (story) => {
    setVoteClicked(true)
    let followerIds = story.followers.map((follower) =>
      JSON.stringify(follower.id)
    )
    if (voted) {
      followerIds = followerIds.filter((id) => id !== JSON.stringify(userId))
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `
        mutation {
          updateUserStory(input: {where: {id: "${story.id}"} data: {followers: [${followerIds}]}}){
            userStory{
              followers {
                id
              }
            }
          }
        }
        `
        },
        {
          withCredentials: true
        }
      )
      setVoteClicked(false)
      followerIds = response.data.data.updateUserStory.userStory.followers.map(
        (follower) => JSON.stringify(follower.id)
      )
      setFollowers(followerIds)
      setVoted(false)
      setVotes((votes) => votes - 1)
    } else {
      const response = await axios.post(
        `${apiURL}/graphql`,
        {
          query: `
        mutation {
          updateUserStory(input: {where: {id: "${story.id}"} data: {followers: [${followers}, "${userId}"]}}){
            userStory{
              followers {
                id
              }
            }
          }
        }
        `
        },
        {
          withCredentials: true
        }
      )
      setVoteClicked(false)
      const followerIds = response.data.data.updateUserStory.userStory.followers.map(
        (follower) => JSON.stringify(follower.id)
      )
      setFollowers(followerIds)
      setVoted(true)
      setVotes((votes) => votes + 1)
    }
  }

  return (
    <div
      className={`flex flex-column vote-wrapper ${
        userId && voted ? 'vote-wrapper-voted' : ''
      }`}
    >
      <div className='votes-count'>{votes}</div>
      <div
        className={`vote-button ${userId ? 'vote-button-clickable' : ''}`}
        onClick={() => {
          if (userId) updateVote(story)
        }}
        disabled={voteClicked}
      >
        <i className='eos-icons'>thumb_up</i>
        Vote
      </div>
    </div>
  )
}

export default Vote
