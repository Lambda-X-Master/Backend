const db = require("../database/dbconfig");

getCart = () => {
    return db('cart').select('cart.id', 'cart.total', 'cart.quantity', 'cart.firebase_id')
};

getCartById = (id) => {
    return db('cart')
    .where({ 'id': id})
    .first()
  }

addCart = (cart, id) => {
    return db('cart').insert(cart).where({'cart.firebase_id': id})
}

getVendorCart = (id) => {
    return db('cart')
        .innerJoin('vendor', 'cart.firebase_id', 'vendor.firebase_id')
        .select('vendor.contact_fullname', 'cart.total', 'cart.quantity')
        .where('cart.firebase_id', id)
}
//   getMarketStalls = (id) => {
//     return db('stalls')
//         .innerJoin('market', 'stalls.market_id', 'market.id')
//         .select('market.name as owned by', 'stalls.name','stalls.size' )
//         .where('stalls.market_id', id)
// }

// async function addCart() {
//     try {
//       let addedCart= {
//         // ...cart,
//         firebase_id: firebaseId
//       };
//       const [id] = await db('cart')
//         .insert(addedCart)
//         .returning("id");
//       return getCartById(id);
//     } catch (err) {
//       console.log(err);
//     }
//   }

  async function addMarket(market, firebaseId) {
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
module.exports = {
    getCartById,
    addCart,
    getCart,
    getVendorCart
}