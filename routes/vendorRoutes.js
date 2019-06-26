const express = require('express');

const vendorController = require('../controllers/vendorController.js');
const cartController = require('../controllers/cart');

const vendorRouter = express.Router();

const isAuthenticated = require('../middleware/firebase.js');

vendorRouter.get('/', vendorController.getVendors);

// Get one Vendor profile by firebase Id
vendorRouter.get('/:firebase_id', vendorController.getVendorByFirebaseId);

// Get one Market by Firebase Id AND all the vendors associated with that market 
vendorRouter.get('/market/:firebaseId/vendor', vendorController.getVendorByMarketFirebaseId);
// vendorRouter.get('/id/:id', vendorController.getVendorById);

//Get Vendor Cart
vendorRouter.get('/:id/cart', cartController.getVendorCart);
vendorRouter.post('/:firebaseId', isAuthenticated, vendorController.addVendorByFirebaseId);
vendorRouter.post('/', isAuthenticated, vendorController.addVendor);
vendorRouter.put('/:firebase_id', isAuthenticated, vendorController.updateVendor);
vendorRouter.delete('/:firebase_id', isAuthenticated, vendorController.deleteVendor);


module.exports = vendorRouter;