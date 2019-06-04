
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', cart => {
        cart.increments()
        cart
        .integer('vendor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('vendor')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart')
  };
