import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const BrandHome = () => {
  const [brand, setBrand] = useState(null);
  const [isEditing, setIsEditing] = useState({
    address: false,
    contactNumber: false,
    website: false
  });
  const [editedData, setEditedData] = useState({
    address: '',
    contactNumber: '',
    website: ''
  });

  const email = JSON.parse(localStorage.getItem('currentBrand'))?.email;
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/brands/${email}`);
        setBrand(response.data);
        setEditedData({
          address: response.data.address,
          contactNumber: response.data.contactNumber,
          website: response.data.website
        });
      } catch (error) {
        console.error('Error fetching brand details:', error);
      }
    };

    fetchBrandDetails();
  }, [email]);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveClick = async (field) => {
    try {
      await axios.put(`http://localhost:5500/api/brands/${email}`, {
        [field]: editedData[field]
      });
      setIsEditing((prev) => ({
        ...prev,
        [field]: false
      }));
      // Fetch updated data
      const updatedResponse = await axios.get(`http://localhost:5500/api/brands/${email}`);
      setBrand(updatedResponse.data);
    } catch (error) {
      console.error('Error updating brand details:', error);
    }
  };

  const handleCancelClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: false
    }));
    // Revert changes
    setEditedData({
      ...editedData,
      [field]: brand[field]
    });
  };

  if (!brand) {
    return <p>Loading brand details...</p>;
  }

  return (
    <div className="brand-home">
      <h2>Your Brand Details</h2>
      <div className="brand-info">
        <h3>{brand.brandName}</h3>
        <p>
          <strong>Email:</strong> {brand.email} {/* No edit button for email */}
        </p>

        <p>
          <strong>Address:</strong>
          {isEditing.address ? (
            <>
              <input
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleInputChange}
              />
              <button className="confirm-button" onClick={() => handleSaveClick('address')}>
                Confirm
              </button>
              <button className="cancel-button" onClick={() => handleCancelClick('address')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {brand.address}
              <button className="edit-icon" onClick={() => handleEditClick('address')}>
                Edit
              </button>
            </>
          )}
        </p>

        <p>
          <strong>Contact Number:</strong>
          {isEditing.contactNumber ? (
            <>
              <input
                type="text"
                name="contactNumber"
                value={editedData.contactNumber}
                onChange={handleInputChange}
              />
              <button className="confirm-button" onClick={() => handleSaveClick('contactNumber')}>
                Confirm
              </button>
              <button className="cancel-button" onClick={() => handleCancelClick('contactNumber')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {brand.contactNumber}
              <button className="edit-icon" onClick={() => handleEditClick('contactNumber')}>
                Edit
              </button>
            </>
          )}
        </p>

        <p>
          <strong>Website:</strong>
          {isEditing.website ? (
            <>
              <input
                type="text"
                name="website"
                value={editedData.website}
                onChange={handleInputChange}
              />
              <button className="confirm-button" onClick={() => handleSaveClick('website')}>
                Confirm
              </button>
              <button className="cancel-button" onClick={() => handleCancelClick('website')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {brand.website}
              <button className="edit-icon" onClick={() => handleEditClick('website')}>
                Edit
              </button>
            </>
          )}
        </p>

        <p>
          <strong>Brand Type:</strong> {brand.brandType}
        </p>
        <p>
          <strong>Established Date:</strong> {new Date(brand.establishedDate).toLocaleDateString()}
        </p>

      </div>
    </div>
  );
};

export default BrandHome;
