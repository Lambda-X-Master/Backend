const Users = require('../models/users');
const db = require('../database/dbconfig');

exports.findUsers = async (req, res, next) => {
    try {
        const usersData = await Users.find()
        console.log(usersData)
        res.status(200).json(usersData)
    } catch (err) {
        res.status(500).json(`No users found`)
        console.log(err)
    }
};

exports.registerOrLogin = async (req,res, next) => {
    try {
        console.log("Test");
        const userData = req.body;
        console.log("Our cool request body: ", req.body); 
        const registerToUser = await Users.registerOrLogin(userData);
        res.status(201).json(registerToUser);
    } catch (error) {
      console.log(error);
    }
  }