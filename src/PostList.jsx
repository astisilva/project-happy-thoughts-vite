import React from 'react'
import './PostList.css'

export const PostList = ({ loading, postList, setPostList, onLike }) => {

  if (loading) {
    return <h1>Loading in progress</h1>
  }


  const handleLikeClick = (postId) => {
    onLike(postId)
  }


  return (

    <div>
      {postList.map((post) => (
        <div className='list' key={post._id}>
          <p>{post.message}</p>
          <button className='like-button' onClick={() => { handleLikeClick(post._id) }}>❤</button>
          <p>{post.hearts}</p>

        </div>

      ))}


    </div>
  )
}
