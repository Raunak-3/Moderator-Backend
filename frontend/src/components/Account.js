import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BrandAccount.css'; // We'll add Instagram-like styling here

const BrandAccount = ({ onClose }) => {  
  const [brand, setBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('settings'); // Tab state for switching between Account Settings and Activity
  const email = JSON.parse(localStorage.getItem('currentBrand'))?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/brands/${email}`);
        setBrand(response.data);
      } catch (error) {
        console.error('Error fetching brand details:', error);
      }
    };

    fetchBrandDetails();
  }, [email]);

  if (!brand) {
    return <p>Loading brand details...</p>;
  }

  const handleNavigate = (path) => {
    navigate(path); // Redirect to the given path
  };

  const handleCloseClick = () => {
    navigate('/brands/dashboard'); // Navigate back to the dashboard or another desired route
  };

  // Function to render Account Settings tab content
  const renderAccountSettings = () => (
    <div className="account-settings">
      <h3>Account Settings</h3>
      <div className="settings-item" onClick={() => handleNavigate('/brands/edit')}>
        <p><strong>General Settings</strong></p>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>Update your brand information, contact number, password, and more.</p>

      {/* <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <p><strong>Privacy Settings</strong></p>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>Manage profile visibility, data sharing, and security preferences.</p> */}

      {/* <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <p><strong>Notifications</strong></p>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>Customize how you'd like to be notified (Email/SMS/Push).</p> */}

      <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <p><strong>Payment & Transactions</strong></p>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>Manage payment methods and view billing history.</p>
    </div>
  );

  // Function to render Activity tab content
  const renderActivity = () => (
    <div className="activity-history">
      <h3>Activity</h3>
  
      <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <h4>Artist Interactions</h4>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>View hire history with artists.</p>
  
      <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <h4>Booking/Job History</h4>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>See completed, ongoing, and cancelled projects with artists.</p>
{/*   
      <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <h4>Favorites & Shortlisted Artists</h4>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>Manage your list of favorited and shortlisted artists.</p> */}
{/*   
      <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <h4>Payments & Transactions</h4>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>View your transaction history, including refunds and disputes.</p> */}
  
      <div className="settings-item" onClick={() => handleNavigate('/dummy-page')}>
        <h4>Notifications History</h4>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <p>Check important alerts and log of your activity.</p>
    </div>
  );
  

  return (
    <div className="brand-account-overlay">
      <div className="brand-account">
        <div className="close-button" onClick={handleCloseClick}>✖</div>
        <h2>Your Account</h2>
        
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={activeTab === 'settings' ? 'active-tab' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            Account Settings
          </button>
          <button 
            className={activeTab === 'activity' ? 'active-tab' : ''} 
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'settings' ? renderAccountSettings() : renderActivity()}
        </div>
      </div>
    </div>
  );
};

export default BrandAccount;
