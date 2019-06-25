const express = require('express');

const marketController = require('../controllers/market');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get('/', marketController.getAllMarkets);
// router.get('/:id', marketController.getMarketById);
router.post('/:firebaseId/add-market', marketController.addMarketByFirebaseId);
router.put('/:id', marketController.editMarket);
router.delete('/:id', marketController.deleteMarket);
router.post('/', marketController.addMarket);

module.exports = router;
