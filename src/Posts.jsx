import { useEffect, useState } from 'react'
import { PostForm } from './PostForm'
import { PostList } from './PostList'

export const Posts = () => {

  const [loading, setLoading] = useState(false)
  const [thoughts, setThoughts] = useState('')
  const [postList, setPostList] = useState([])
  const [textMessage, setTextMessage] = useState('')

  const url = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts'


  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        console.log('data', data)
        setPostList(data)
      }
    } catch (error) {
      console.error(error)

    } finally {
      setLoading(false)
    }
  }


  const handleNewThoughtChange = (event) => {
    setThoughts(event.target.value);
    setTextMessage('');
  };


  const handleSubmitForm = async (event) => {
    event.preventDefault()


    console.log('Thoughts length:', thoughts.length);


    if (!thoughts) {
      setTextMessage(`You have to write something`)
    } else if (thoughts.length < 5) {
      setTextMessage(`Your message is to short it has to be at least 5 letters`)
    } else if (thoughts.length > 140) {
      setTextMessage(`Your message is too long`)
    }



    console.log('Request Payload:', JSON.stringify({ description: thoughts }));


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: thoughts,
      }),

    };


    try {
      const response = await fetch(url, options);
      if (response.ok) {
        await fetchPosts();
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to create the thought. Server response: ${errorMessage}`);
      }
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('Network error. Please check your internet connection.');
      } else {
        console.error('An unexpected error occurred while creating the thought:', error);
      }
    }

  }


  const handleLike = async (postId) => {
    const likeUrl = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${postId}/like`;

    try {
      const response = await fetch(likeUrl, {
        method: 'POST',
      })
      if (response.ok) {
        await fetchPosts()
      } else {
        const errorMessage = await response.text()
        console.error(`Failed to Like the thought. Server response: ${errorMessage}`)
      }
    } catch (error) {
      console.error('An unexpected error occurred while liking the thought:', error)
    }
  }


  useEffect(() => {
    fetchPosts();
  }, [setTextMessage]);

  return (
    <div>
      <PostForm
        thoughtValue={thoughts}
        newThoughtChange={handleNewThoughtChange}
        onSubmitForm={handleSubmitForm}
        textMessage={textMessage} />

      <PostList
        loading={loading}
        postList={postList}
        setPostList={setPostList}
        onLike={handleLike}

      />
    </div>
  )
}
