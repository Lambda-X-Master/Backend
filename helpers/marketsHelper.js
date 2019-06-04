const db = require('../database/dbconfig');

module.exports ={
    find,
    findByMarketId,
    deleteByMarketId,
    updateByMarketId
}

//find all markets
function find() {
    return db("market");
  }
  
// find market by firebase_id
function findByMarketId(id) {
    return db("market").where({ firebase_id: id });
  }
 
// delete market by firebase_id
function deleteByMarketId (id){
    return db("market")
    .where({
      firebase_id: id
    })
    .delete()   
}

// update market name by firebase_id
function updateByMarketId (id, marketName){
    return db('market')
    .where({
        firebase_id: id
    })
    .select("market_name")
    .update({
        market_name: marketName
    });
}