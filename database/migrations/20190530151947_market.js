
exports.up = function(knex, Promise) {
    return knex.schema.createTable('market', market => {
        market.increments().primary()
        market
            .string("firebase_id")
            .unsigned()
            .unique()
            .notNullable()
            .references("firebase_id")
            .inTable("users")
            .onUpdate("CASCADE");
        market.string("market_name");
        market.string('contact_first_name')
        market.string('contact_last_name');
        market.string("address");
        market.string("city");
        market.string("state");
        market.integer("zipcode");
        market.string("phone_number");
        market.string("stripeAccountId");
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('market')
  };
