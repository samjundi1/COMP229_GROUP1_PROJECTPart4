const mongoose = require('mongoose');

// Schema for flowers
const FlowerSchema = new mongoose.Schema({
    flowerId: {
        type: String,
        trim: true,
        unique: true,
        required: 'Flower id is required'
    },
    name: {
        type: String,
        trim: true,
        required: 'Flower name is required'
    },
    description: {
        type: String,
        trim: true,
        required: 'Description is required'
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    imageUrls: {
        type: [String],
        trim: true,
        required: 'We would appreciate an image of this flower'
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    availabilityStatus: {
        type: String,
        trim: true,
        required: 'Availability status is required'
    },
    occasions: {
        type: [String],
        trim: true,
        required: 'What is the occasion for?'
    },
    categories: {
        type: [String],
        trim: true,
        required: 'Categories are required'
    },
    notes: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('flowers', FlowerSchema);
