import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({post}) => {
  return (
    <Link to={`/post/${post._id}`} className='post-item' >
      <p className='post-item-title'>{post.title}</p>
      <p className='post-item-text'>{post.text}</p>
      <p className='post-item-date'>{post.formatted_timestamp}</p>
      {post.published
      ?(<p className='post-item-published'>Published</p>)
      :(<p className='post-item-unpublished'>Unpublished</p>)}
    </Link>
  )
}

export default PostItem