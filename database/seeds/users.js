const faker = require("faker");
const bcrypt = require('bcrypt');
exports.seed = function(knex, Promise) {
  // const userSeeds = num => {
  //   const users = [];
  //   for (let i = 0; i < num; i++) {
  //     users.push({

  //       firebase_id: faker.random.uuid(),
  //       email: faker.internet.email(),
  //     });
  //   }
  //   return users;

  function createFakeUser(i) {    
    const user_type = i % 2 ? "market" : "vendor";

    return {
      email: faker.internet.email(),
      firebase_id: faker.random.alphaNumeric(8),      
      user_type
    };
  }
  const users = [];
  const numFakes = 502;
  for (let i = 0; i < numFakes; i++) {
    users.push(createFakeUser(i));
  } 

  return (
    knex("users")     
      .then(function() {
        return knex("users").insert(users);
      })
  );
};
