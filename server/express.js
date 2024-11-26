// require module
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// API endpoint
app.get('/api/v1', (req, res) => {
    res.json({
      project: "Group 2 project",
    });
  });
  
  // Extract routes going from index.html
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  });

 
app.use(express.json());
// Middleware
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;