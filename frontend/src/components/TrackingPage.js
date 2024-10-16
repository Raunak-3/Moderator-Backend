import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import './TrackingPage.css'; // Import the CSS for styling

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigating back to login

  const handleTrackingIdChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleCheckStatus = async () => {
    setError(''); // Clear previous errors
    setStatusMessage(''); // Clear previous status

    try {
      const response = await axios.get(`http://localhost:5500/api/brands/status/${trackingId}`);
      setStatusMessage(response.data.statusMessage);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Tracking ID not found. Please check your input.');
      } else {
        setError('Failed to fetch status. Please try again later.');
      }
    }
  };

  const handleBackClick = () => {
    navigate('/brands/login'); // Redirect to login page
  };

  return (
    <div className="tracking-page">
      <button className="back-button" onClick={handleBackClick}>← Back</button>
      <h2>Track Your Registration Status</h2>
      <div className="input-section">
        <label htmlFor="trackingId">Enter your Tracking ID:</label>
        <input
          type="text"
          id="trackingId"
          value={trackingId}
          onChange={handleTrackingIdChange}
          required
        />
        <button className="check-status-button" onClick={handleCheckStatus}>Check Status</button>
      </div>

      {/* Display status or error messages */}
      {statusMessage && (
        <p
          className="status-message"
          style={{ color: statusMessage.includes('approved') ? 'green' : 'red' }} // Green for approved, red for pending
        >
          {statusMessage}
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TrackingPage;
