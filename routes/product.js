const express = require('express');

const productsController = require('../controllers/product');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get("/vendor/:vendor_id", productsController.getProductsByVendorId);
router.post("/vendor/:vendor_id", isAuthenticated, productsController.addProductByVendorId); 
router.put("/:product_id", isAuthenticated, productsController.updateProductByProductId);
router.delete("/:product_id", isAuthenticated, productsController.deleteProductByProductId);

module.exports = router; 