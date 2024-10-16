const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing

const brandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that the email is unique
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  brandType: {
    type: String,
  },
  establishedDate: {
    type: Date,
  },
  document: {
    type: String, // Path to the uploaded document (proof)
  },
  displayPicture: {
    type: String, // Path to the uploaded display picture
  },
  password: {
    type: String,
    required: true,
  },
  trackingId: { type: String, unique: true},
  status: { type: Boolean, default: false } 
});


const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
