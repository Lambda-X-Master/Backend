const Users = require("../models/users");
const db = require("../database/dbconfig");

exports.findUsers = async (req, res, next) => {
  try {
    const usersData = await Users.find();
    console.log(usersData);
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(`No users found`);
    console.log(err);
  }
};

exports.registerOrLogin = async (req, res, next) => {
  try {
    console.log("Test");
    const userData = req.body;
    console.log("Our cool request body: ", req.body);
    const registerToUser = await Users.registerOrLogin(userData);
    res.status(201).json(registerToUser);
  } catch (error) {
    console.log(error);
  }
};

// exports.registerOrLogin = async (req, res, next) => {
//   try {
//     let newUser = req.body;
//     if (newUser) {
//       const user = await Users.register(newUser);
//       console.log("newUser", newUser);
//       res.status(200).json({ user, message: "Thank you for Registering" });
//     } else {
//         res.status(404).json({
//             message: 'Incomplete registration'
//         })
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };
