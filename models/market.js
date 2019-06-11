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

function findByMarketID(id) {
  return db("market")
    .where({ 'id': id })
    .first();
}

function findByMarketFirebaseID(id) {
  return db("market")
    .where({ 'firebase_id': id })
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

async function addMarketByFirebaseId(market, firebaseId) {
  try {
    let addedMarket = {
      ...market,
      firebase_id: firebaseId
    };
    const [id] = await db("market")
      .insert(addedMarket)
      .returning("id");
    return findByMarketID(id);
  } catch (err) {
    console.log(err);
  }
}



async function addMarket(market) {
  const [id] = await db("market")
    .insert(market)
    .returning("id");
  return findByMarketID(id);
}

module.exports = {
    findAllMarkets,
    findByMarketID,
    deleteByMarketId,
    updateByMarketId,
    addMarket,
    findByMarketFirebaseID,
    addMarketByFirebaseId
}
