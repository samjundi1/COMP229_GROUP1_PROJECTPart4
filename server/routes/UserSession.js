// routes for UserSession
const express = require('express');
const router = express.Router();
const userSessionController = require('../controllers/userSession');

// User session routes
router.post('/userSessions', userSessionController.createUserSession);
router.get('/userSessions/:token', userSessionController.getUserSessionByToken);
router.put('/userSessions/:sessionId', userSessionController.updateUserSession);
router.delete('/userSessions/:sessionId', userSessionController.deleteUserSession);

module.exports = router;