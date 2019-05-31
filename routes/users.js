const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();
const firebaseMiddleware = require("../middleware/firebase.js");

router.get('/', usersController.findUsers)
router.post("/register", usersController.registerOrLogin); 
router.get("/login", usersController.registerOrLogin);

// router.post("/register", firebaseMiddleware, usersController.registerOrLoginFB);
// router.get('/login/:id', firebaseMiddleware, usersController.login);

module.exports = router