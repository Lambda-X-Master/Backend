const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/', cartController.getCart);

module.exports = router

