const db = require('../database/dbconfig');

module.exports ={
    find,
    findByMarketID,
    deleteByMarketId,
    updateByMarketId
   
}

//find all markets
function find() {
    return db("market");
  }
  
// find market by firebase_id
function findByMarketID(id) {
    return db("market").where({ firebase_id: String(id) });
  }
 
// delete market by firebase_id
function deleteByMarketId (id){
    return db("market")
    .where({
      firebase_id: String(id)
    })
    .delete()   
}

// update market name by firebase_id
function updateByMarketId (id, changes){
    return db('market')
    .where({
        firebase_id: String(id)
    })
    .update(
      changes, "*"
    );
}