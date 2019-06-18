exports.up = function(knex, Promise) {
  return knex.schema.createTable("product", product => {
    product.increments();
    product.string("title");
    product.string("description", 450);
    product.float("price");
    product.string("image", 250);
    product
      .string("vendors_id")
      .unsigned()
      .notNullable()
      .references("firebase_id")
      .inTable("vendor")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("product");
};

//To Do
//couldn't make connect with firebase id will have to look into this later
