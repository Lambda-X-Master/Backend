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

function getMarketByfirebaseId(firebaseId) {
  return db("market")
    .where({ 'firebase_id': firebaseId })
    .first();
}

// async function addMarketByFirebaseId(market, firebaseId) {
//   try {
//     let addedMarket = {
//       ...market,
//       firebase_id: firebaseId
//     };
//     console.log("posted market", addedMarket);
//     return db("market").insert(addedMarket).select('*').returning('id');

//   } catch (err) {
//     console.log(err);
//   }
// }

async function addMarketByFirebaseId(market, firebaseId) {
  try {
    let addedMarket = {
      ...market,
      firebase_id: firebaseId
    };
    const [id] = await db("market")
      .insert(addedMarket)
      .returning("id");
    return getMarketById(id);
  } catch (err) {
    console.log(err);
  }
}

async function addMarket(market) {
  const [id] = await db("market")
    .insert(market)
    .returning("id");
  return getMarketById(id);
}

module.exports = {
  findAllMarkets,
  getMarketById,
  addMarketByFirebaseId,
  addMarket,
  getMarketByfirebaseId,
  findByMarketID,
  deleteByMarketId
};
