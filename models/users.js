const db = require('../database/dbconfig');

 find = () => {
    return db("users").select(
      "id",      
      "firebase_id",
      "email",
      "user_type"
    );
  };

  async function registerOrLogin(user) {
    try {
      // console.log("User:", user);
      const loggedInUser = await db('users').where({ firebase_id: user.firebase_id}).first();
      console.log("loggedInUser: ", loggedInUser);
      if(!!loggedInUser) {
        return loggedInUser;
      } else {
        const [id] = await db('users').insert(user, 'id');
        console.log("user id:", id);
        const signedUpUser = await db('users').where({ id: id }).first();
        console.log("signed up user:", signedUpUser);
        return signedUpUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {
      find,
      registerOrLogin
  }