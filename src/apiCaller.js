import axios from 'axios';

const url = 'https://blog-api-xkrg.onrender.com';

const getConfig = () => {
  const token = localStorage.getItem('token');
  return ({
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export const getAllPosts = async() => {
  try {
    const response = await axios.get(`${url}/post/allposts`, getConfig());
    return response.data;
  } catch(err) {
    console.log(err.message);
  }
}

export const setPost = async(data) => {
  try {
    const response = await axios.post(`${url}/post/create`, data, getConfig());
    return response.data;
  } catch(err) {
    console.log(err.message);
  }
}

export const getPost = async(postid) => {
  try{
    const response = await axios.get(`${url}/post/${postid}`);
    return response.data;
  } catch(err) {
    console.log(err.message);
  }
}

export const updatePost = async(postid, data) => {
  try {
    const response = await axios.post(`${url}/post/${postid}/update`, data, getConfig());
    return response.data;
  } catch(err) {
    console.log(err.message);
  }
}

export const deletePost = async(postid) => {
  try {
    const response = await axios.post(`${url}/post/${postid}/delete`, {}, getConfig());
    return response.data;
  } catch(err) {
    console.log(err.message);
  }
}

export const deleteComment = async(commentid) => {
  try {
    const response = await axios.post(`${url}/comment/${commentid}/delete`, {}, getConfig());
    return response.data;
  } catch(err) {
    console.log(err.message);
  }
}

export const login = async(data) => {
  try {
    const response = await axios.post(`${url}/admin/login`, data);
    localStorage.setItem('token',response.data.token);
    return response.data;
  } catch(err) {
    if (err.response.status===400) {
      return {error: err.response.data};
    }
    console.log(err.message);
  }
}