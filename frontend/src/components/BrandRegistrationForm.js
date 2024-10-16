import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import './BrandRegistrationForm.css';

function BrandRegistrationForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    address: '',
    contactNumber: '',
    website: '',
    brandType: '',
    establishedDate: '',
    document: null,
  });

  const [errors, setErrors] = useState({});

  const industries = [
    'Fashion', 'Restaurants', 'Sports', 'Technology', 'Health & Wellness',
    'Education', 'Finance', 'Automotive', 'Entertainment', 'Real Estate',
    'Hospitality', 'Retail', 'Consulting', 'Beauty', 'Manufacturing'
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Update to use a single file
    }));
    // Clear error when input changes
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Brand Name Validation
    const brandNamePattern = /^[a-zA-Z0-9!@#$%^&*()+=._-]+$/;
    if (!formData.brandName || formData.brandName.length < 4) {
      newErrors.brandName = 'Brand name must be at least 4 characters long';
    } else if (!/[a-zA-Z]/.test(formData.brandName)) {
      newErrors.brandName = 'Brand name must contain at least one letter';
    } else if (!brandNamePattern.test(formData.brandName)) {
      newErrors.brandName = 'Brand name contains invalid characters';
    }
    
    // Email validation
    if (!formData.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    //password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    
    // Contact Number validation
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Phone number must be exactly 10 digits';
    }
    
    // Brand Type validation
    if (!formData.brandType) {
      newErrors.brandType = 'Please select a brand type';
    }
    
    // Document validation
    if (!formData.document || formData.document.type !== 'application/pdf') {
      newErrors.document = 'Only PDF files are allowed for document uploads';
    }
  
    return newErrors;
  };
  

  // Define handleBlur for individual field validation
  const handleBlur = (e) => {
    const { name } = e.target;
    const newErrors = validateForm();
    if (newErrors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: newErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Stop submission if there are errors
    }

    // Create a FormData object to handle file uploads
    const form = new FormData();
    for (const key in formData) {
        form.append(key, formData[key]);
    }

    try {
        // Adjust the endpoint URL to match your API route
        const response = await axios.post('http://localhost:5500/api/brands/register', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const { trackingId } = response.data;

        // Show alert with the tracking ID
        alert(`Brand registered successfully! Your Tracking ID is: ${trackingId}, Copy this now for future use`);
  
        console.log(formData)
        console.log(response.data);

        // Store the registered brand information in localStorage (optional)
        localStorage.setItem('currentBrand', JSON.stringify(response.data));

        // Navigate to the home page after successful registration
        navigate('/brands/login'); // Update the path to your actual home route

    } catch (error) {
      if(error.response && error.response.status === 400 && error.response.data.message === 'Email already exists')
      {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exists' })); // Optionally set an error state

        alert('Email already exists');      
      }
      else{
        console.error('Error registering brand:', error);
        alert('Error registering brand, please try again.');}
    }
};


  return (
    <div className="registration-form">
            <div className="form-header">
        <h2>Register Your Brand</h2>
        <p className="signin-link">
          Already a user?{' '}
          <Link to="/brands/login">Sign in</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Input fields for brand registration */}
        <label htmlFor="brandName">Brand Name: <span className="required">*</span></label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.brandName && <p className="error">{errors.brandName}</p>}

        <label htmlFor="email">Email: <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="address">Address: <span className="required">*</span></label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <label htmlFor="password">Password: <span className="required">*</span></label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* Confirm Password Field */}
        <label htmlFor="confirmPassword">Confirm Password: <span className="required">*</span></label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}


        <label htmlFor="contactNumber">Contact Number: <span className="required">*</span></label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}

        <label htmlFor="website">Website/LinkedIn/Insta link: <span className="required">*</span></label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.website && <p className="error">{errors.website}</p>}

        <label htmlFor="brandType">Brand Type: <span className="required">*</span></label>
        <select
          id="brandType"
          name="brandType"
          value={formData.brandType}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="">Select Brand Type</option>
          {industries.map((industry, index) => (
            <option key={index} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        {errors.brandType && <p className="error">{errors.brandType}</p>}

        <label htmlFor="establishedDate">Established Date: <span className="required">*</span></label>
        <input
          type="date"
          id="establishedDate"
          name="establishedDate"
          value={formData.establishedDate}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.establishedDate && <p className="error">{errors.establishedDate}</p>}

        <label htmlFor="document">Upload Document (PDF only): <span className="required">*</span></label>
        <input
          type="file"
          id="document"
          name="document"
          onChange={handleChange}
          required
        />
        {errors.document && <p className="error">{errors.document}</p>}

        <button type="submit">Register Brand</button>
      </form>
    </div>
  );
}

export default BrandRegistrationForm;
