const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photographerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in months
  details: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
