import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./Home.css";

const Home = () => {
  const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
  const decodedToken = jwtDecode(token);
        if (decodedToken.role === "user") {
          navigate("/user");
        } else {
          navigate("/organizer");
        }
    }
  }, [navigate]);  return (
    <div className="home-container"> 
      <h2 className="home-title">Welcome to Event Add App</h2>
      <p className="home-description">Your gateway to discovering and organizing amazing events.</p>
      <div className="home-button-container">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="home-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;