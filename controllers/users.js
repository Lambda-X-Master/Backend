const Users = require('../models/users');

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
