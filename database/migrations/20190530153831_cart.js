
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments()
        cart
        .string('firebase_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('vendor')
        .unique()
        // cart.float('total')
        // cart.integer('quantity')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
