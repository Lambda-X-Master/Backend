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
// async function findById(id) {
//   const user = await db("users")
//     .where({ id })
//     .first();
//   // console.log(user);
//   return user;
// }

function findById(firebase_id) {
  return db("users")
    .where({ 'firebase_id': firebase_id })
    .first();
};

function login(email) {
  return db("users").where({email: email}).first();
}
function updateUser(firebase_id, changes) {
  return db("users")
    .where({ firebase_id })
    .update(changes, "*");
}

async function findByUserType(user) {
  try {
    const firebase_id = user.firebase_id;
    const type = user.user_type;
    const userTypeData = await db(`${type}`)
      .where({ firebase_id })
      .first();
    return { user, userTypeData };
  } catch (error) {
    throw new Error("Could not retrieve usertype information");
  }
}



module.exports = {
  find,
  registerOrLogin,
  register,
  findById,
  login,
  updateUser,
  findByUserType,
 
};
