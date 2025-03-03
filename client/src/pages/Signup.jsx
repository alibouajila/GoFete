import React, {useEffect,useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'; 
import './auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to home if the user is already logged in
      navigate('/user');
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:3001/user/register', { name, email, password, role });
      setSuccessMessage(response.data.message);
      // Reset form after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
      navigate('/login')
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-link">
        <p>
           have an account? <a href="/login">Login</a>
        </p>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default Signup;
