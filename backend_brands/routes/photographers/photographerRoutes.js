const express = require('express');
const router = express.Router();
const Booking = require('../../models/Booking');
const Photographer = require('../../models/model_photographer/photographer');


// Fetch all photographers
router.get('/', async (req, res) => {
    try {
        const photographers = await Photographer.find();
        res.json(photographers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a single photographer by ID
router.get('/:id', async (req, res) => {
    try {
        const photographer = await Photographer.findById(req.params.id);
        if (!photographer) {
            return res.status(404).json({ message: 'Photographer not found' });
        }
        res.json(photographer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch photographers by location
router.get('/search/:term', async (req, res) => {
    try {
        const searchTerm = req.params.term;
        const photographers = await Photographer.find({
            $or: [
                { location: { $regex: searchTerm, $options: 'i' } }, // Match location
                { skills: { $regex: searchTerm, $options: 'i' } } // Match skills
            ]
        });
        res.json(photographers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const { userId, photographerId, amount, date, duration, details } = req.body;
  
    try {
      const photographer = await Photographer.findById(photographerId);
      if (!photographer) {
        return res.status(404).json({ message: 'Photographer not found' });
      }
  
      const newBooking = new Booking({
        userId,
        photographerId,
        amount,
        date,
        duration,
        details,
        status: 'pending',
      });
  
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking' });
    }
  });
  
  // Get all booking requests for a specific user
  router.get('/user/:userId', async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.params.userId }).populate('photographerId');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  });

module.exports = router;


