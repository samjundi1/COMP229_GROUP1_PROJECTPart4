//Import Express and create a router
const express = require("express");
const router = express.Router();

//Define regex patterns for images and videos
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
const videoRegex = /\/.+\.(mp4|ogv)$/

//Iterate over the regex patterns and create a route for each
router.get(imageRegex, (req, res) => {
    const filePath = req.path;
    res.redirect(303, `http://localhost:3000/src${filePath}`);
});
router.get(videoRegex, (req, res) => {
    const filePath = req.path;
    res.redirect(303, `http://localhost:3000/src${filePath}`);
});

//Export the router
module.exports = router;