const express = require('express');

const marketController = require('../controllers/market');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get('/', marketController.getAllMarkets);
<<<<<<< HEAD

// router.post('/:firebaseId', marketController.addMarketByFirebaseId);
// router.post('/', marketController.addMarket);
=======
router.get('/:id', marketController.getMarketById);
router.post('/add-market', marketController.addMarket);
router.put('/:id', marketController.editMarket);
router.delete('/:id', marketController.deleteMarket);
>>>>>>> 3fc9fa6c4568901f806f111aa8b890aa0f61bf08

module.exports = router