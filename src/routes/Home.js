import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllPosts } from '../apiCaller';
import Loading from '../components/Loading';
import PostItem from '../components/PostItem';

const Home = () => {

  const navigate = useNavigate();
  const [posts, setposts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getAllPosts().then(response=>{
      if(response){
        setposts(response);
      } else{
        console.log('failed to download');
        // localStorage.clear();
        navigate('/login');
      }
      setLoading(false);
    })
  }, [navigate]);

  return (
    <div className='posts'>
      <Link to='/post/create'><p id='new-post'>New Post</p></Link>
      {loading
      ?<Loading />
      :posts
        ?<>
            {posts.map((post,i) => {
              return (
                <PostItem post={post} key={i} />
              )
            })}
        </>
        :'No Posts'}
    </div>
  )
}

export default Home