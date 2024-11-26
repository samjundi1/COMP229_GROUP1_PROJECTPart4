// routes for Occation
const express = require('express');
const router = express.Router();
const occasionController = require('../controllers/Occasion');

// Occasion routes
router.post('/occasions', occasionController.createOccasion);
router.get('/occasions', occasionController.getAllOccasions);
router.get('/occasions/:occasionId', occasionController.getOccasionById);
router.put('/occasions/:occasionId', occasionController.updateOccasion);
router.delete('/occasions/:occasionId', occasionController.deleteOccasion);

module.exports = router;
