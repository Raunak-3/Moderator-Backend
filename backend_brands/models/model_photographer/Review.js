const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  reviewText: { type: String, required: true },
  photographerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
