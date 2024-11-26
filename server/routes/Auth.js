// routes for Auth
const express = require('express');
const router = express.Router();
const { signin, signout, hasAuthorization, requireSignin, getUser } = require('../controllers/auth');

// Authentication routes
router.post('/signin', signin);
router.post('/signout', signout);

module.exports = router;