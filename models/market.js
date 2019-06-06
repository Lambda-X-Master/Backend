const db = require('../database/dbconfig');

findAllMarkets = () => {
    return db('market')
        .select(
            "firebase_id", 
            "market_name", 
            "contact_first_name", 
            "contact_last_name", 
            "address", 
            "city", 
            "state", 
            "zipcode", 
            "phone_number"
        ); 
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

async function addMarket(market) {
   const [id] = await db('market').insert(market, 'id')
  return findByMarketID({ id })
}

module.exports = {
    findAllMarkets,
    findByMarketID,
    deleteByMarketId,
    updateByMarketId,
    addMarket
}