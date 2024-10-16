import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BrandDashboard.css';

const BrandDashboard = () => {
  const [brandData, setBrandData] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const email = JSON.parse(localStorage.getItem('currentBrand'))?.email;
  const navigate = useNavigate();

  // Fetch brand data from the backend
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/brands/${email}`);
        setBrandData(response.data);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };
    fetchBrandData();
  }, [email]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentBrand');
    navigate('/');
  };

  // Sidebar visibility toggle
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="menu-toggle" onClick={toggleSidebar}>
          <span className="menu-dot"></span>
          <span className="menu-dot"></span>
          <span className="menu-dot"></span>
        </div>
        <div className="brand-logo">
          <h1>✨ House Of Marktech</h1>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/brands/account')} className="nav-button">Your Account</button>
          <button onClick={handleLogout} className="nav-button logout-button">Logout</button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="close-sidebar" onClick={toggleSidebar}>✖</div>
        <h2 className="sidebar-title">🎨 Slide In..</h2>
        <ul>
          <li><Link onClick={() => setSidebarVisible(false)} to="/brands/dashboard">Home</Link></li>
          <li><Link onClick={() => setSidebarVisible(false)} to="/photographer">Search Artists</Link></li>
          <li><Link onClick={() => setSidebarVisible(false)} to="/brands/status">Previous Booking Status</Link></li>
          <li><Link onClick={() => setSidebarVisible(false)} to="/brands/home">Account Settings</Link></li>
          <li><Link onClick={() => setSidebarVisible(false)} to="/brands/details">Know More About Us</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {brandData ? (
          <div className="brand-info-container">
            <h2>Welcome, {brandData.brandName}!</h2>
            <div className="brand-stats">
              <div className="stat-item">
                <h3>Brand Type</h3>
                <p>{brandData.brandType}</p>
              </div>
              <div className="stat-item">
                <h3>Established Date</h3>
                <p>{new Date(brandData.establishedDate).toLocaleDateString()}</p>
              </div>
              <div className="stat-item">
                <h3>Contact Number</h3>
                <p>{brandData.contactNumber}</p>
              </div>
              <div className="stat-item">
                <h3>Address</h3>
                <p>{brandData.address}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading brand details...</p>
        )}

        {/* Animated Button */}
        <div className="button-container">
          <button className="shape-shifting-button" onClick={() => navigate('/photographer')}>
            Start Searching Artists
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;
