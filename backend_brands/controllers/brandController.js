const bcrypt = require('bcrypt');
const Brand = require('../models/Brand');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto'); // Import crypto for generating random tracking IDs

// Helper function to generate a random tracking ID
const generateTrackingId = () => {
  return crypto.randomBytes(8).toString('hex'); // Generates a random 16-character hex string
};

exports.registerBrand = async (req, res) => {
  try {
    const {
      brandName,
      email,
      address,
      contactNumber,
      website,
      brandType,
      establishedDate,
      password
    } = req.body;

    // Check if email already exists
    const existingBrand = await Brand.findOne({ email });
    if (existingBrand) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const document = req.file ? req.file.path : null; // Assuming you are using multer for file upload

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random tracking ID
    const trackingId = generateTrackingId();

    // Create a new Brand object with the provided data and the tracking ID
    const newBrand = new Brand({
      brandName,
      email,
      address,
      contactNumber,
      website,
      brandType,
      establishedDate,
      document,
      password: hashedPassword,
      trackingId // Assign the generated tracking ID
    });

    // Save the new brand in the database
    await newBrand.save();

    // Return success with the tracking ID
    res.status(201).json({ brand: newBrand, trackingId });

  } catch (error) {
    console.error('Error saving brand:', error);
    res.status(500).json({ message: 'Failed to register brand' });
  }
};

  

exports.getBrandDetails = async (req, res) => {
    const { email } = req.params;

    try {
        const brand = await Brand.findOne({ email });
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.json(brand);
    } catch (error) {
        console.error('Error fetching brand details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBrandDetails = async (req, res) => {
    const email = req.params.email;
    const updates = req.body;

    try {
        // Update the brand details in the database based on the email
        await Brand.updateOne({ email }, { $set: updates });

        res.status(200).send('Brand details updated');
    } catch (error) {
        console.error('Error updating brand details:', error);
        res.status(500).send('Error updating brand details');
    }
};


exports.loginBrand = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the brand with the provided email
    const brand = await Brand.findOne({ email });
    if (!brand) {
      return res.status(404).json({ message: 'Email not registered' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, brand.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token (optional)
    // const token = generateJWT(brand._id); // Assuming you have a generateJWT function

    // On successful login, return the brand details and token
    return res.status(200).json({ message: 'Login successful', brand });
  } catch (error) {
    console.error('Error during brand login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Find the brand by email
    const brand = await Brand.findOne({ email });
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, brand.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Old password does not match' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    brand.password = hashedNewPassword;
    await brand.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error); // Log the full error
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

