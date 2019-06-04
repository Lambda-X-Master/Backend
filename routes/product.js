const express = require('express');

const productsController = require('../controllers/product');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get("/vendor/:vendor_id", productsController.getProductsByVendorId)
router.post("/vendor/:vendor_id", productsController.addProductByVendorId); 
router.put("/:product_id", productsController.updateProductByProductId);
router.delete("/:product_id", productsController.deleteProductByProductId);

module.exports = router; 