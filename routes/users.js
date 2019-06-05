const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");



router.post("/register", isAuthenticated, usersController.registerOrLogin); 
router.get("/login", isAuthenticated, usersController.registerOrLogin);
router.get('/',  isAuthenticated, usersController.findUsers)

// router.post("/register", isAuthenticated, usersController.registerOrLoginFB);
// router.get('/login/:id', usersController.login);

module.exports = router;