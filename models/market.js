const db = require("../database/dbconfig");

findAllMarkets = () => {
  return db("market").select(
    "market_name",
    "contact_first_name",
    "contact_last_name",
    "address",
    "city",
    "state",
    "zipcode",
    "phone_number"
  );
};

function getMarketById(id) {
  return db("market")
    .where({ id })
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

// async function addMarket(market) {
//   const [id] = await db("market")
//     .insert(market)
//     .returning("id");
//   return getMarketById(id);
// }

module.exports = {
  findAllMarkets,
  getMarketById,
  addMarketByFirebaseId,
//   addMarket
};
