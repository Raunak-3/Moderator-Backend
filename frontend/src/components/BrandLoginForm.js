import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './BrandLoginForm.css';

function BrandLoginForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
      const response = await axios.post('http://localhost:5500/api/brands/login', loginData);

      // Store the logged-in brand information in localStorage (optional)
      localStorage.setItem('currentBrand', JSON.stringify(response.data.brand));

      // Redirect to the brand dashboard
      alert('Login successful!');
      navigate('/brands/dashboard');
    } catch (error) {
      // Handle specific error messages based on HTTP status
      if (error.response && error.response.status === 404) {
        setError('Email not registered. Please sign up.');
      } else if (error.response && error.response.status === 401) {
        setError('Invalid password. Please try again.');
      } else {
        setError('Error logging in, please try again.');
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Brand Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Add a link to the sign-up page */}
      <p className="sign-up-link">
        Don't have an account? <Link to="/">Sign Up Here</Link>
      </p>

      {/* Add a link to the tracking page */}
      <p className="track-registration-link">
        Want to check your registration status? <Link to="/brands/status">Track Your Registration</Link>
      </p>
    </div>
  );
}

export default BrandLoginForm;
