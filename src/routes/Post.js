import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getPost, deletePost } from '../apiCaller';
import Comment from '../components/Comment';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const Post = () => {

  const {postid} = useParams();

  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getPost(postid).then(response=>{
      if(response) {
        setPostInfo(response);
      } else {
        console.log('failed to download');
      }
      setLoading(false);
    })
  }, [postid]);

  const deleteThePost = async () => {
    if (window.confirm('Are you sure you want to delete the post?')) {
      try{
        await deletePost(postid);
      } catch(err) {
        console.log('error: ', err);
      } finally {
        navigate('/');
      }
    }
  }

  return (
    <>
      {loading
      ?<Loading />
      :postInfo
      ?<div className="post-container">
        <div className="post-content">
          {postInfo.post.published
            ?(<p className='post-item-published'>Published</p>)
            :(<p className='post-item-unpublished'>Unpublished</p>)}
          <h1>{postInfo.post.title}</h1>
          <p className="post-content-text">
            {postInfo.post.text}
          </p>
          <p className="post-item-date">{postInfo.post.formatted_timestamp}</p>
        </div>
        <div className='post-buttons'>
        <Link to={`/post/${postid}/update`}>
          <button className='btn-edit'>Edit</button>
        </Link>
          <button onClick={deleteThePost} className='btn-delete'>Delete</button>
        </div>
        {postInfo.comments.length
        ?<div className="comment-section">
          <h2>Comments</h2>
          {postInfo.comments.map((comment, i)=>{
            return(
              <Comment createdAt={comment.formatted_timestamp} commentid={comment._id} username={comment.username} text={comment.text} key={i} />
            )
          })}
        </div>
        :<p>No comments</p>}
      </div>
      :'No Post'}
    </>
  )
}

export default Post