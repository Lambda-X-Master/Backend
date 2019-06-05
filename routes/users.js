const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();
const isAuthenticated = require("../middleware/firebase.js");

router.get('/', usersController.findUsers);
router.get('/:firebase_id', usersController.getUserByFirebaseId);
router.post("/register", isAuthenticated, usersController.registerOrLogin); 
router.get("/login", usersController.registerOrLogin);
// router.get('/', isAuthenticated, usersController.findUsers);

router.put("/:firebase_id", usersController.updateUser);

module.exports = router;