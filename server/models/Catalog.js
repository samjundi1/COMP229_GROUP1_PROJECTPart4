const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema({
  itemId: {
    type: String,
    trim: true,
    required: 'Item ID is required',
  },
  flower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flowers', // Reference the 'flowers' collection
    required: 'Flower reference is required',
  },
  vendorId: {
    type: String,
    trim: true,
    required: 'Vendor ID is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('catalogs', CatalogSchema);

