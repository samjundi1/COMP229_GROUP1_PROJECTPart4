//Routes for UserCatalog
const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/UserAccount');

// User account routes
router.post('/userAccounts', userAccountController.createUserAccount);
router.get('/userAccounts', userAccountController.getAllUserAccounts);
router.get('/userAccounts/:email', userAccountController.getUserAccountByEmail);
router.get('/userAccounts/getByUserAccId',userAccountController.getUserAccountByUserAccId);
router.post('/userAccounts/getByUserAccId',userAccountController.getUserAccountByUserAccId);
router.get('/userAccounts/getByUserAccName',userAccountController.getUserAccountByUserAccName)
router.post('/userAccounts/getByUserAccName',userAccountController.getUserAccountByUserAccName);
router.put('/userAccounts/:userId', userAccountController.updateUserAccount);
router.delete('/userAccounts/:userId', userAccountController.deleteUserAccount);

module.exports = router;
