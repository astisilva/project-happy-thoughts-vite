import {React, useState }from 'react'
import '../styles/PostForm.css'

export const PostForm = ({ thoughtValue, newThoughtChange, onSubmitForm, textMessage }) => {

const [remainingCharacters, setRemainingCharacters]=useState(140)


const handleTextCharacterChange =(event)=>{
  const currentLength = event.target.value.length
  const remaining = 140 - currentLength
  setRemainingCharacters(remaining)
  newThoughtChange(event)
}

  return (
    <form onSubmit={onSubmitForm}>
      <h2>What is making you happy right now?</h2>
      <textarea
        value={thoughtValue}
        onChange={handleTextCharacterChange}
        placeholder="I'll be back - Terminator"
        rows={4}
        cols={70}
      /><div className='text'>
      <p className='text-message'>{textMessage}</p>
      <p className='remaining-character'>{remainingCharacters}</p>
      
      </div>
      <button className='happy-button'>❤️ Send happy thought ❤️</button>
    </form>
  )
}
