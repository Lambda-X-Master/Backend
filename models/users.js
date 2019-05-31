const db = require("../database/dbconfig");

find = () => {
  return db("users").select("id", "firebase_id", "email", "user_type");
};

async function registerOrLogin(user) {
  try {
    // console.log("User:", user);
    const loggedInUser = await db("users")
      .where({ firebase_id: user.firebase_id })
      .first();
    console.log("loggedInUser: ", loggedInUser);
    if (!!loggedInUser) {
      return loggedInUser;
    } else {
      const [id] = await db("users").insert(user, "id");
      console.log("user id:", id);
      const signedUpUser = await db("users")
        .where({ id: id })
        .first();
      console.log("signed up user:", signedUpUser);
      return signedUpUser;
    }
  } catch (error) {
    console.log(error);
  }
}

async function register(user) {
  const [id] = await db("users")
    .insert(user)
    .returning("id");

  return findById(id);
}

function findById(firebase_id) {
  return db("users")
    .where({ firebase_id: firebase_id })
    .first();
};

function login(email) {
  return db("users").where({email: email}).first();
}

module.exports = {
  find,
  registerOrLogin,
  register,
  findById,
  login
};
