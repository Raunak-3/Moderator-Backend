import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditPage.css';

const EditBrand = () => {
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem('currentBrand'))?.email;

  const [formData, setFormData] = useState({
    address: '',
    contactNumber: '',
    website: '',
  });

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/brands/${email}`);
        const brand = response.data;
        setFormData({
          address: brand.address,
          contactNumber: brand.contactNumber,
          website: brand.website,
        });
      } catch (error) {
        console.error('Error fetching brand details:', error);
      }
    };

    fetchBrandDetails();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5500/api/brands/${email}`, formData);
      navigate('/brands/home');
    } catch (error) {
      console.error('Error updating brand details:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
  
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:5500/api/brands/change-password`, {
        email,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
  
      if (response.data.success) {
        alert('Password updated successfully');
        setShowPasswordPopup(false);
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        setPasswordError(''); // Clear any existing error
      } else {
        setPasswordError(response.data.message || 'Failed to update password'); // Display error from backend
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordError(error.response?.data?.message || 'An error occurred while updating the password');
    }
  };
  

  return (
    <div className="overlay">
      <div className="edit-container">
        {!showPasswordPopup && (
          <>
            <div className="back-arrow" onClick={() => navigate('/brands/home')}>
              &#8592; {/* Back arrow */}
            </div>
            <h2>General Settings</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Website/LinkedIn/Insta link:</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="button-container">
                <span className="change-password-link" onClick={() => setShowPasswordPopup(true)}>
                  Change Password
                </span>
                <button type="submit" className="save-changes-btn">Save Changes</button>
              </div>
            </form>
          </>
        )}

        {showPasswordPopup && (
          <div className="password-popup">
            <div className="popup-content">
              <div className="close-button" onClick={() => setShowPasswordPopup(false)}>
                &#10005; {/* Cross icon */}
              </div>
              <h3>Change Password</h3>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password<span className="asterisk">*</span>:</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password<span className="asterisk">*</span>:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmNewPassword">Confirm New Password<span className="asterisk">*</span>:</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                {passwordError && <p className="error-message">{passwordError}</p>}

                <button type="submit" className="save-changes-btn">Change Password</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBrand;
