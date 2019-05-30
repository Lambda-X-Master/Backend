
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments().primary()
        users.string('email').notNullable()
        users.string('firebase_id').notNullable().unique()
        users.enum('user_type', ['market', 'vendor'])
  
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  };
