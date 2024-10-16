import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BrandAccount.css'; // Reuse the same CSS

const AccountDisplay = () => {
  const [brand, setBrand] = useState(null);
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

  const handleCloseClick = () => {
    navigate('/brands/dashboard'); // Redirect back to the dashboard
  };

  return (
    <div className="brand-account-overlay">
      <div className="brand-account">
        <div className="close-button" onClick={handleCloseClick}>✖</div>
        <h2>Account Overview</h2>

        <div className="account-settings">
          <div className="settings-item">
            <p><strong>Brand Name:</strong></p>
            <p>{brand.brandName}</p>
          </div>
          <div className="settings-item">
            <p><strong>Email:</strong></p>
            <p>{brand.email}</p>
          </div>
          <div className="settings-item">
            <p><strong>Address:</strong></p>
            <p>{brand.address}</p>
          </div>
          <div className="settings-item">
            <p><strong>Contact Number:</strong></p>
            <p>{brand.contactNumber}</p>
          </div>
          {brand.website && (
            <div className="settings-item">
              <p><strong>Website:</strong></p>
              <p><a href={brand.website} target="_blank" rel="noopener noreferrer">{brand.website}</a></p>
            </div>
          )}
          {brand.brandType && (
            <div className="settings-item">
              <p><strong>Brand Type:</strong></p>
              <p>{brand.brandType}</p>
            </div>
          )}
          {brand.establishedDate && (
            <div className="settings-item">
              <p><strong>Established Date:</strong></p>
              <p>{new Date(brand.establishedDate).toLocaleDateString()}</p>
            </div>
          )}
          {brand.displayPicture && (
            <div className="settings-item">
              <p><strong>Display Picture:</strong></p>
              <img src={brand.displayPicture} alt="Display" style={{ width: '100px', borderRadius: '50%' }} />
            </div>
          )}
        </div>

        {/* Button to navigate to Account Settings */}
        <div className="go-to-settings">
          <button className="settings-button" onClick={() => navigate('/brands/home')}>
            Go to Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDisplay;
