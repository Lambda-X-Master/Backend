
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments().primary()
        users.string('email').notNullable()
        users.string('password').notNullable();
        users.enum('user_type', ['market', 'vendor'])
  
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  };
