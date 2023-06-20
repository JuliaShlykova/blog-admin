import React, { useState } from 'react';
import { login } from '../apiCaller';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    try{
      const response = await login({
        username,
        password
      });
      if (response.hasOwnProperty('error')) {
        setError(response['error']);
      } else {
        navigate('/');
      }
    } catch(err) {
      console.log('error');
    }
  }

  return (
    <div className='form-container login-form-container'>
      <h2>Log In</h2>
      <form action="" className='login-form' onSubmit={submitForm} >
        <label htmlFor="">Username: </label>
        <input type="text" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
        <div className="errors">
          {error?(
              <p>{error}</p>
            )
          :null}
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default Login