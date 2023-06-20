import React, { useReducer, useState } from 'react'
import { setPost } from '../apiCaller';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [published, toggle] = useReducer(published => !published, false);
  const [errors, setErrors] = useState(null);

  const submitForm = async(e) => {
    e.preventDefault();
    try {
      const response = await setPost({title, text, published});
      if (response.hasOwnProperty('errors')) {
        setErrors(response['errors']);
      } else {
        navigate('/');
      }
    } catch(err) {
      console.log('error');
    }
  }

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form className='post-form' onSubmit={submitForm}>
        <label htmlFor="new-post-title">Title: </label>
        <input id="new-post-title" name="title" type="text" value={title} onChange={(e=>{setTitle(e.target.value)})} required />
        <label htmlFor="new-post-text">Text: </label>
        <textarea name="text" id="new-post-text" value={text} onChange={(e)=>{setText(e.target.value)}} required />
        <label htmlFor="new-post-published" className='label-publish'>
          <input type="checkbox" id="new-post-published" checked={published} onChange={toggle} />
          <span>Publish</span>
        </label>
        <div className="errors">
          {errors?errors.map((err,i) => {
            return (
              <p key={i}>{err.msg}</p>
            )
          }):null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost