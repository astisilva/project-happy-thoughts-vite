import { React, useState } from 'react'
import './PostList.css'

export const PostList = ({ loading, postList, setPostList, onLike }) => {

  const [likedPostId, setLikedPostId] = useState([])

  const timeDifference = (createdAt) => {

    const currentTime = new Date()
    const postTime = new Date(createdAt)
    const timeDifference = Math.abs(currentTime - postTime)

    const minutes = Math.floor(timeDifference / (1000 * 60))


    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    } else {
      const hours = Math.floor(minutes / 60);
      return `about ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

  }


  if (loading) {
    return <h1>Loading in progress</h1>
  }


  const handleLikeClick = (postId) => {
    onLike(postId)

    setLikedPostId((prevLikedPostId) => [...prevLikedPostId, postId])
  }

  const isLiked = (postId) => likedPostId.includes(postId)

  return (

    <div>
      {postList.map((post) => (
        <div className='list' key={post._id}>
          <p>{post.message}</p>
          <button
            className={`like-button ${isLiked(post._id) ? 'liked' : ''}`}
            onClick={() => { handleLikeClick(post._id) }}
          >❤</button>
          <p>{post.hearts}</p>
          <p>{timeDifference(post.createdAt)}</p>
        </div>

      ))}


    </div>
  )
}
