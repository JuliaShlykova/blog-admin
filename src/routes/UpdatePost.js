import React, { useEffect, useReducer, useState } from 'react'
import { getPost, updatePost } from '../apiCaller';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const UpdatePost = () => {

  const navigate = useNavigate();

  const {postid} = useParams();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getPost(postid).then(response=>{
      if(response) {
        setTitle(response.post.title);
        setText(response.post.text);
        setPublished(response.post.published);
      } else {
        console.log('failed to download');
      }
      setLoading(false);
    })
  }, [postid]);

  const submitForm = async(e) => {
    e.preventDefault();
    try {
      const response = await updatePost(postid, {title, text, published});
      if (response.hasOwnProperty('errors')) {
        setErrors(response['errors']);
      } else {
        navigate(`/post/${postid}`);
      }
    } catch(err) {
      console.log('error');
    }
  }

  return (
    <>
    {loading
      ?<Loading />
      :title
        ?<div className="form-container">
          <h2>Update Post</h2>
          <form className='post-form' onSubmit={submitForm}>
            <label htmlFor="new-post-title">Title: </label>
            <input id="new-post-title" name="title" type="text" value={title} onChange={(e=>{setTitle(e.target.value)})} required />
            <label htmlFor="new-post-text">Text: </label>
            <textarea name="text" id="new-post-text" value={text} onChange={(e)=>{setText(e.target.value)}} required />
            <label htmlFor="new-post-published" className='label-publish'>
              <input type="checkbox" id="new-post-published" checked={published} onChange={()=>{setPublished(prevPublished=>!prevPublished)}} />
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
        :'No Post'}
    </>
  )
}

export default UpdatePost;