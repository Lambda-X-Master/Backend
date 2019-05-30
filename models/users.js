const db = require('../database/dbconfig');

 find = () => {
    return db("users").select(
      "id",
      "password",
      "firebase_id",
      "email",
    );
  }

  module.exports = {
      find
  }