const db = require("../database/dbconfig");

getCart = () => {
    return db('cart')
};

getCartById = (id) => {
    return db('cart')
    .where({ firebase_id: id})
  }

//   getMarketStalls = (id) => {
//     return db('stalls')
//         .innerJoin('market', 'stalls.market_id', 'market.id')
//         .select('market.name as owned by', 'stalls.name','stalls.size' )
//         .where('stalls.market_id', id)
// }

module.exports = {
    getCartById
}