const mongoose = require('mongoose');

// Schema for categories
const CategoriesSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        trim: true,
        unique: true,
        required: 'Category ID is required'
    },
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    description: {
        type: String,
        trim: true,
        required: 'Description is required'
    }
});

module.exports = mongoose.model('categories', CategoriesSchema);
