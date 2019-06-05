const express = require('express');

const vendorController = require('../controllers/vendorController.js');

const vendorRouter = express.Router();

const isAuthenticated = require('../middleware/firebase.js');

vendorRouter.get('/', vendorController.getVendors);
vendorRouter.get('/:firebase_id', vendorController.getVendorByFirebaseId);
vendorRouter.get('/id/:id', vendorController.getVendorById);
// vendorRouter.post('/:firebase_id', vendorController.getVendorById);
vendorRouter.post('/', vendorController.addVendor);
vendorRouter.put('/:firebase_id', vendorController.updateVendor);
vendorRouter.delete('/:firebase_id', vendorController.deleteVendor);


module.exports = vendorRouter;