const db = require('../database/dbconfig');

module.exports ={
    find,
    findByMarketId
}

//find all markets
function find() {
    return db("market");
  }
  
// find market by firebase_id
function findByMarketId(id) {
    return db("market").where({ firebase_id: id });
  }
  
