const express = require('express');

const productsController = require('../controllers/product');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get("/get-products/vendor/:vendor_id", isAuthenticated, productsController.getProductsByVendorId)
router.post("/add-product/vendor/:vendor_id", isAuthenticated, productsController.addProductByVendorId); 
router.put("/edit-product/:product_id", isAuthenticated, productsController.updateProductByProductId);
router.delete("/delete-product/:product_id", isAuthenticated, productsController.deleteProductByProductId);

module.exports = router; 