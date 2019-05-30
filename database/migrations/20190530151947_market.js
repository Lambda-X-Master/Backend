
exports.up = function(knex, Promise) {
    return knex.schema.createTable('market', market => {
        market.increments().primary()
        market.string('firebase_id').notNullable().unique()
        market.string('name')
        market.integer('avail_stalls')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('market')
  };
