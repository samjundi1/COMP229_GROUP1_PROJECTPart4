const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/Flower.js');

// Create a new flower
router.post('/flowers', flowerController.createFlower);
// Create a new flower and add it to catalogs,; only using frontend
router.post('/flowersCat', flowerController.createFlowerAddToCat);
// Get all flowers
router.get('/flowers', flowerController.getAllFlowers);
// Get a flower by id
router.get('/flowers/:flowerId', flowerController.getFlowerById);
// Get a flower by VendorId
router.post('/flowers/:vendorId', flowerController.getFlowerByVendorId);

// Update a flower
router.put('/flowers/:flowerId', flowerController.updateFlower);
// Update a flower
router.put('/flowers/:flowerIdCat', flowerController.updateFlowerAndCat);

// Delete a flower
router.delete('/flowers/:flowerId', flowerController.deleteFlower);
// Delete a flower and catalog
router.delete('/flowers/:flowerIdCat', flowerController.deleteFlowerAndCat);
module.exports = router;
