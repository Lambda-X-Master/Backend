const db = require('../database/dbconfig');

 find = () => {
    return db("users").select(
      "id",      
      "firebase_id",
      "email",
    );
  };

  async function registerOrLogin(user) {
    try {
      const loggedInUser = await db('users').where({ firebase_id: user.firebase_id}).first();
      if(!!loggedInUser) {
        return loggedInUser;
      } else {
        const [id] = await db('users').insert(user, 'id');
        const signedUpUser = await db('users').where({ id: id }).first();
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