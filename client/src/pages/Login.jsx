import React, {useEffect,useState } from 'react';
import axios from 'axios';
import './auth.css'; // Make sure to import your provided CSS file
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to home if the user is already logged in
      navigate('/user');
    }
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Sending login request to the server
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      // Successful login: store token in localStorage or sessionStorage
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Redirect to the home or dashboard page
      window.location.href = '/user'; // Change this to your desired route
    } catch (err) {
      // Handle error and display message
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="auth-link">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
