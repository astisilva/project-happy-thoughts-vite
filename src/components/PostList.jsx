import { React, useState } from 'react'
import '../styles/PostList.css'

export const PostList = ({setLoading,  postList, onLike}) => {

  const [likedPostId, setLikedPostId] = useState([])

  const timeDifference = (createdAt) => {
    const currentTime = new Date()
    const postTime = new Date(createdAt)
    const timeDifference = Math.abs(currentTime - postTime)
    const minutes = Math.floor(timeDifference / (1000 * 60))


    if (minutes < 1) {
      return 'less than a minute ago';
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `about ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  }

  
  const handleLikeClick = (postId,event) => {
    event.preventDefault()
    setLoading(true);
    onLike(postId)
    setLikedPostId((prevLikedPostId) => [...prevLikedPostId, postId])
    
  }


  const isLiked = (postId) => likedPostId.includes(postId)

  return (

    <div>
      {postList.map((post) => (
        <div className='list' key={post._id}>
          <p className='posted-message'>{post.message}</p>
          <div className='info'>
            <button
              className={`like-button ${isLiked(post._id) ? 'liked' : ''}`}
              onClick={(event) => {
                handleLikeClick(post._id,event);
              }}
            >❤️</button>
            <p className='heart'>x {post.hearts}</p>
            <p className='time'>{timeDifference(post.createdAt)}</p>
          </div>
        </div>

      ))}


    </div>
  )
}
