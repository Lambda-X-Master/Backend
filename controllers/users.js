const Users = require("../models/users");
const db = require("../database/dbconfig");

exports.findUsers = async (req, res, next) => {
  try {
    const noob = req.body
    const usersData = await Users.find();
    console.log('ok',noob);
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(`No users found`);
    console.log(err);
  }
};



exports.registerOrLogin = async (req, res, next) => {
  try {
    // console.log("Test");
    const { email, user_type } = req.body;
    console.log("Our cool request body: ", req);
    const firebase_id = req.body.uid;
    console.log("req dot user: ", req.user);
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
// };

exports.login = async (req, res, next) => {
    if (req.params.id) {
      Users.login(req.params.id)
        .then((user) => {
          console.log(user, 'login by id')
            res.status(200).json({ message: `Welcome ${user.email}!` });
        })
        .catch(error => {
          res.status(500).json(error);
          console.log(error)
        });
    } else {
      res.status(401).json({ message: "Invalid email provided." });
    }
};

exports.getUserByFirebaseId = async (req, res) => {
  try {
    const { firebase_id } = req.params;
    if (firebase_id) {
      const user = await Users.findById(firebase_id);
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "No user with that firebase Id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `User could not be found in the database: ${error}` });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await Users.updateUser(req.params.firebase_id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "User is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating user: ${error}` });
  }
};

