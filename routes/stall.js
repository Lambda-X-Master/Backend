const express = require('express');

const stallsController = require('../controllers/stall');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get("/", stallsController.getStalls)
router.get("/market/:market_id", stallsController.getStallsByMarketId)
router.post("/market/:market_id", stallsController.addStallByMarketId); 
router.put("/:stall_id", stallsController.updateStallsByStallId);
router.delete("/:stall_id", stallsController.removeStallsByStallId);

module.exports = router; 