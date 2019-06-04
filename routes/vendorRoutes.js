const express = require('express');

const vendorController = require('../controllers/vendorController.js');

const vendorRouter = express.Router();

const isAuthenticated = require('../middleware/firebase.js');

vendorRouter.get('/', vendorController.getVendors);

module.exports = vendorRouter;