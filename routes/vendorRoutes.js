const express = require('express');

const vendorController = require('../controllers/vendorController.js');
const cartController = require('../controllers/cart');

const vendorRouter = express.Router();

const isAuthenticated = require('../middleware/firebase.js');

vendorRouter.get('/', vendorController.getVendors);
vendorRouter.get('/:firebase_id', vendorController.getVendorByFirebaseId);
vendorRouter.get('/market/:firebaseId/vendor', vendorController.getVendorByMarketFirebaseId);
vendorRouter.get('/id/:id', vendorController.getVendorById);
//Get Vendor Cart
vendorRouter.get('/:id/cart', cartController.getVendorCart);
vendorRouter.post('/:firebaseId', isAuthenticated, vendorController.addVendorByFirebaseId);
vendorRouter.post('/', isAuthenticated, vendorController.addVendor);
vendorRouter.put('/:firebase_id', isAuthenticated, vendorController.updateVendor);
vendorRouter.delete('/:firebase_id', isAuthenticated, vendorController.deleteVendor);

//test

vendorRouter.post('/:id/add-cart', cartController.addCart);
vendorRouter.get('/cart', cartController.getCart)
// vendorRouter.post('/:id/add-vendor', vendorController.addVendor);


module.exports = vendorRouter;