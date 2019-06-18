const express = require('express');

const ordersController = require('../controllers/orders');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get("/", ordersController.getOrders)
router.get('/:order_id', ordersController.getOrderById);
router.get("/vendor/:vendor_id", ordersController.getOrdersByVendorId);

router.post("/vendor/:vendor_id", ordersController.addOrderByVendorId); 
router.put("/:order_id", ordersController.updateOrderByOrderId);
router.delete("/:order_id", ordersController.removeOrderByOrderId);
router.delete("/vendor/:vendorId", ordersController.removeOrdersByVendorId);

module.exports = router; 