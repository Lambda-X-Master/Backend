
    exports.up = function(knex, Promise) {
        return knex.schema.createTable('stall', stall => {
            stall.increments()
            stall.string('name')
            stall.string('size')
            stall
              .integer('market_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('market')
        })
      };

      exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('stall')
      };
