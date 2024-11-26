//Routes for Catalog

const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/Catalog');

// Catalog routes
router.post('/catalogs', catalogController.createCatalogEntry);
router.get('/catalogs', catalogController.getCatalogEntries);
router.get('/catalogs/:itemId', catalogController.getCatalogEntryById);
router.put('/catalogs/:itemId', catalogController.updateCatalogEntry);
router.delete('/catalogs/:itemId', catalogController.deleteCatalogEntry);

module.exports = router;