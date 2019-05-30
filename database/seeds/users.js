const faker = require("faker");
const bcrypt = require('bcrypt');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  const userSeeds = num => {
    const users = [];
    for (let i = 0; i < num; i++) {
      users.push({
        password: bcrypt.hashSync("password", 10),
        firebase_id: faker.random.uuid(),
        email: faker.internet.email(),
      });
    }
    return users;
  };

  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(userSeeds(500));
    });
};
