const express = require('express');

const vendorController = require('../controllers/vendorController.js');

const vendorRouter = express.Router();

const isAuthenticated = require('../middleware/firebase.js');

vendorRouter.get('/', vendorController.getVendors);
vendorRouter.get('/:firebase_id', vendorController.getVendorByFirebaseId);
// vendorRouter.post('/:firebase_id', vendorController.getVendorById);
vendorRouter.post('/', vendorController.addVendor);
vendorRouter.put('/:id', vendorController.updateVendor);
vendorRouter.delete('/:id', vendorController.deleteVendor);


module.exports = vendorRouter;