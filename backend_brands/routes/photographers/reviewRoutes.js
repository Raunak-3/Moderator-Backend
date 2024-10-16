const express = require('express');
const router = express.Router();
const Review = require('../../models/model_photographer/Review')

// Get all reviews for a specific photographer
router.get('/:photographerId', async (req, res) => {
  try {
    const reviews = await Review.find({ photographerId: req.params.photographerId });
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a new review
router.post('/', async (req, res) => {
  const { userName, reviewText, photographerId } = req.body;
  try {
    const newReview = new Review({ userName, reviewText, photographerId });
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
