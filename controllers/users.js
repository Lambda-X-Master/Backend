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

exports.registerOrLogin = async (req, res, next) => {
    try {
      // console.log("Test");
      const { email, user_type } = req.body;
      console.log("Our cool request body: ", req.body);
      const firebase_id = req.user
      const registerToUser = await Users.registerOrLogin({ firebase_id, email, user_type });
      res.status(201).json(registerToUser);
    } catch (error) {
      console.log(error);
    }
  };

// exports.registerOrLogin = async (req,res, next) => {
//     try {
//         console.log("Test");
//         const userData = req.body;
//         console.log("Our cool request body: ", userData); 
//         const registerToUser = await Users.registerOrLogin({firebase_id, email});
//         console.log("reguser", registerToUser)
//         res.status(201).json(registerToUser);
//     } catch (error) {
//       console.log(error);
//     }
//   }