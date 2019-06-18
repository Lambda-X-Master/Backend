
exports.up = function(knex, Promise) {
    return knex.schema.createTable('orders', orders => {
        orders.increments();
        orders
        .string('vendor_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('vendor')
        .unique();
        orders.int("stall_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("stall")
        .unique();
        orders.string('market_id')
        .unsigned()
        .notNullable()
        .references('market_id')
        .inTable('stall')
        .unique();
        orders.json('size');
        orders.float('price');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('orders')
  };
