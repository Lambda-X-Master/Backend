const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();
const firebaseMiddleware = require("../middleware/firebase.js");

router.get('/', usersController.findUsers)
router.post("/register", firebaseMiddleware, usersController.registerOrLogin); 
router.get("/login", usersController.registerOrLogin);

module.exports = router