import React from 'react'
import './PostForm.css'

export const PostForm = ({ thoughtValue, newThoughtChange, onSubmitForm, textMessage }) => {
  return (
    <form onSubmit={onSubmitForm}>
      <h2>What is making you happy right now?</h2>
      <textarea
        value={thoughtValue}
        onChange={newThoughtChange}
        rows={4}
        cols={70}
      />
      <p>{textMessage}</p>
      <button className='happy-button'>♥ Send happy thought ♥</button>
    </form>
  )
}
