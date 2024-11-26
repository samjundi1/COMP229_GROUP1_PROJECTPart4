// routes for Category
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/Category');

// Category routes
router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId', categoryController.getCategoryById);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;
