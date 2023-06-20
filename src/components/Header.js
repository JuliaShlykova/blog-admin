import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header>
      <Link to="/">
        <p><span>Story</span><span>Blog-admin</span></p>
      </Link>
      {token?<button onClick={logout}>log out</button>:null}
    </header>
  )
}

export default Header