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
vendorRouter.post('/:firebaseId', vendorController.addVendorByFirebaseId);
vendorRouter.post('/', vendorController.addVendor);
vendorRouter.put('/:firebase_id', vendorController.updateVendor);
vendorRouter.delete('/:firebase_id', vendorController.deleteVendor);

//test

vendorRouter.post('/:id/add-cart', cartController.addCart);
vendorRouter.get('/cart', cartController.getCart)


module.exports = vendorRouter;