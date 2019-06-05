const express = require('express');

const marketController = require('../controllers/market');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get('/', marketController.getAllMarkets)

module.exports = router