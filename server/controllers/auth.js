const express = require('express')
const UserAccount = require('../models/UserAccount.js');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const expressJwt = require('express-jwt');
require('dotenv').config();

// Sign-in function
async function signin(req, res) {
    try {
        console.log('Sign-in request received:', req.body);
        let userAccount = await UserAccount.findOne({ "email": req.body.email });
        if (!userAccount) {
            console.log('User not found');
            return res.status(401).json({ error: 'User does not exist' });
        }
        if (!userAccount.validatePassword(req.body.password)) {
            console.log('Password is incorrect');
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        const token = jwt.sign({ _id: userAccount._id }, config.jwtSecret);
        res.cookie('t', token, { expire: new Date() + 9999 });

        const response = {
            token,
            userAccount: {
                _id: userAccount._id,
                userAccId: userAccount.userAccId,
                userAccName: userAccount.userAccName,
                email: userAccount.email,
                role: userAccount.role,
                type: userAccount.type
            }
        };
        // Log the response object
        console.log('Response:', response);
        return res.json(response);
                } catch (err) {
                    console.error('Sign-in error:', err);
                    return res.status(401).json({ error: 'Unable to sign in' });
                }

};
// Sign-out function
const signout = (req, res) => {
    res.clearCookie("t");
    return res.status('200').json({
        message: "Successfully signed out"
    });
};
// Require sign-in middleware
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
});

// Authorization check
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status('403').json({
            error: 'You are not authorized to perform this operation'
        });
    }
    next();
};




module.exports = { signin, signout, hasAuthorization, requireSignin };
