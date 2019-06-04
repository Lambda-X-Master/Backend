exports.seed = function(knex, Promise) {
    //Deletes ALL existing entries
    return knex("market")
      .del()
      .then(function() {
        return Promise.all([
          // Inserts seed entries
          knex("market").insert({
            market_name: 'Test Market 1',
            firebase_id: 'g2j69qqd'
          })
        ]);
      });
  };
  