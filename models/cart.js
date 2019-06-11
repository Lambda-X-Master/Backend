const db = require("../database/dbconfig");

getCart = () => {
    return db('cart')
        .select('cart.id',  'cart.firebase_id')
};

getCartById = (id) => {
    return db('cart')
    .where({ 'firebase_id': id})
    .first()
  }

// addCart = (id) => {
//     return db('cart')
//     .insert(id)
//     .returning(id)
// }

getVendorCart = (id) => {
    return db('cart')
        .innerJoin(
            'vendor', 
            'cart.firebase_id', 
            'vendor.firebase_id'
        )
        .select('vendor.contact_fullname')
        .where({'firebase_id': id})
        // .console.log(firebase_id)
}

// getVendorCart = (id) => {
//     return db('cart')
//         .select('vendor.')
//         .where({'firebase_id': id})
//         .first()
// }

async function addCart(firebaseId) {
    try {
      let addedCart= {
        // ...cart,
        firebase_id: firebaseId
      };
      const [id] = await db('cart')
        .insert(addedCart)
        .returning("id");
      return getCartById(id);
    } catch (err) {
      console.log(err);
    }
  }

  addStallToCart = (stallId, cartId) => {
      
        let addedItem = {
            stallId,
            cartId
        }
        return db('cart-item').insert(addedItem)
  }

 
module.exports = {
    getCartById,
    addCart,
    getCart,
    getVendorCart
}