import React from 'react'
import { deleteComment } from '../apiCaller'

const Comment = ({username, createdAt, text, commentid}) => {

  const deleteTheComment = async() => {
    try {
      await deleteComment(commentid);
      window.location.reload();
    } catch(err) {
      console.log('failed to delete: ', err);
    }
  }

  return (
    <div className='comment-item'>
      <p className="comment-username">{username}</p>
      <p className="comment-text">{text}</p>
      <p className="comment-createdAt">{createdAt}</p>
      <p className='comment-delete' onClick={deleteTheComment}>delete</p>
    </div>
  )
}

export default Comment