const db = require("../database/dbconfig");

findAllMarkets = () => {
    return db('market')
        .select(
            "id",
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
// function findByMarketID(firebase_id) {
//     return db("market").where("firebase_id", firebase_id );
//   }

function findByMarketID(firebase_id) {
  return db("market")
    .where({ 'firebase_id': firebase_id })
    .first();
}
 
// delete market by firebase_id
function deleteByMarketId(id){
  return db("market")
  .where({ 'firebase_id': id })
  .del();  
}

function updateByMarketId(firebaseId, changes) {
  return db("market")
    .where({ firebase_id: firebaseId })
    .update(changes);
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
