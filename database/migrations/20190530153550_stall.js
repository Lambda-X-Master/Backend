
    exports.up = function(knex, Promise) {
        return knex.schema.createTable('stall', stall => {
            stall.increments();
            stall.json('size')
            stall
              .integer('market_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('market')
            stall.boolean("available");
            stall.integer("qty");
        })
      };

      exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('stall')
      };
