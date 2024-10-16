const express = require('express');
const { registerBrand, getBrandDetails, updateBrandDetails, loginBrand, resetPassword } = require('../controllers/brandController');
const multer = require('multer'); // For handling file uploads
const router = express.Router();
const Brand = require('../models/Brand'); // Import your Brand model

// const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// POST route for registering a brand
router.post('/register', upload.single('document'), registerBrand);


router.post('/login', loginBrand);

// GET route for fetching brand details
router.get('/:email', getBrandDetails);

// PUT route for updating brand details
router.put('/:email', updateBrandDetails);

router.post('/change-password', resetPassword);

// Add this in your routes (e.g., brandRoutes.js or equivalent)
// const express = require('express');

// Route to check the status of registration by tracking ID
router.get('/status/:trackingId', async (req, res) => {
  const { trackingId } = req.params;

  try {
    const brand = await Brand.findOne({ trackingId });

    if (!brand) {
      return res.status(404).json({ message: 'Tracking ID not found' });
    }

    // Return status message
    const statusMessage = brand.status
      ? 'Your registration has been approved!'
      : 'Your registration is still pending. Please wait for approval.';
    res.json({ trackingId: brand.trackingId, statusMessage });
  } catch (error) {
    console.error('Error fetching registration status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;




