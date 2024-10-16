const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    skills:{type: String}
});

module.exports = mongoose.model('Photographer', photographerSchema);
