
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments()
        cart
        .integer('firebase_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('vendor')
        cart.float('total')
        cart.integer('quantity')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
