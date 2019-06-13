const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/', cartController.getCarts);
router.get('/:id', cartController.getCartById);
router.post('/add-stall-to-cart/:id', cartController.addStallToCart);
router.post('/checkout', cartController.checkout);
// router.post('/pay', cartController.pay);

module.exports = router

