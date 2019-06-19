
exports.up = function(knex, Promise) {
    return knex.schema.createTable('orders', orders => {
        orders.increments();
        orders
        .string('vendor_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('vendor')
        orders.integer("stall_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("stall")
        orders.string('market_id')
        .unsigned()
        .notNullable()
        .references('firebase_id')
        .inTable('market');
        orders.json('size');
        orders.float('price');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('orders')
  };
