//Import Express and create a router
const express = require("express");
const router = express.Router();

//Define regex patterns for images and videos
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
const videoRegex = /\/.+\.(mp4|ogv)$/

// Get the correct frontend URL based on the environment
const frontendUrl = process.env.REACT_FRONTEND || 'http://localhost:3000';

// Iterate over the regex patterns and create a route for each
router.get(imageRegex, (req, res) => {
    const filePath = req.path;
    // Redirect to the appropriate frontend URL
    res.redirect(303, `${frontendUrl}/src${filePath}`);
});

router.get(videoRegex, (req, res) => {
    const filePath = req.path;
    // Redirect to the appropriate frontend URL
    res.redirect(303, `${frontendUrl}/src${filePath}`);
});

//Export the router
module.exports = router;