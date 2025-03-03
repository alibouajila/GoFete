import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token');  
    setIsLoggedIn(false);
    navigate("/login")  
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-link">Home</a>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="navbar-button" onClick={onLogout}>Logout</button>
        ) : (
          <>
            <a href="/login" className="navbar-link">Login</a>
            <a href="/signup" className="navbar-link">Sign Up</a>
          </>
        )}
        <a href="/about" className="navbar-link">About Us</a>
      </div>
    </div>
  );
}

export default Navbar;
