
exports.up = function(knex, Promise) {
    return knex.schema.createTable('vendor', vendor => {
        vendor.increments()
        vendor
            .string("firebase_id")
            .unsigned()
            .unique()
            .notNullable()
            .references("firebase_id")
            .inTable("users")
            .onUpdate("CASCADE");
        vendor.string('company_name')
        vendor.string('contact_fullname')
        vendor.string('address')
        vendor.string('city')
        vendor.string('state')
        vendor.string('zip_code')
        vendor.string('phone')
        vendor.string('company_url')
        vendor
          .integer('market_id')
          .unsigned()
          // .notNullable()
          .references('id')
          .inTable('market')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('vendor')
  };
