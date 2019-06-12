const cart = require('../models/cart');

exports.getVendorCart = async (req, res, next) => {
    try {
        // const id = req.params.id
        console.log(typeof id, 'get cart id')
        const vendorCart = await cart.getCartById(req.params.id)
        res.status(200).json(vendorCart)
    } catch (err) {
        res.status(500).json({message: `error getting vendors cart`})
        console.log(err, 'error from get vendor cart')
    }
}

exports.getCarts = async (req, res, next) => {
    try {
        const id = req.params.id
        cartData = await cart.getCart()
        console.log(req.body)
        res.status(200).json(cartData)
        console.log(cartData, 'cart created')
    } catch (err){
        res.status(500).json(err)
        console.log(err, 'error from get cart')
    }
}

//currently not storing total to the database will have to look at db diagram later
exports.getCartById = async (req, res, next) => {
    try {
        const id = req.params.id
        const cartData = await cart.getCartById(id)
        const cartItem = await cart.getCartItems(id)
        console.log(cartItem, 'cart item')
        let updatedTotal = 0
        const price = cartItem.forEach(element => {
            return updatedTotal += element.price 
        });
        const roundedTotal = Math.ceil(updatedTotal * 100) / 100
        let total = roundedTotal
        console.log(total, 'total')
        res.status(200).json({cartItem, total})
    } catch (err) {
        res.status(500).json(err)
        console.log(err, 'error from get cart')
    }
}

// exports.addCart = async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const cartInfo = req.body
//         const vendorCart = await cart.addCart(id)
//         console.log(vendorCart)
//         res.status(201).json(vendorCart)
//     } catch (err) {
//         res.status(500).json(`error adding cart`)
//         console.log(err, 'error from add cart')
//     }
// }

exports.addStallToCart = async (req, res, next) => {
    try {
        const cartId = req.params.id
        stall = req.body.id
        console.log(req.body, 'stall fron at to cart')
        const addedStall = await cart.addStallToCart(stall, cartId)
        res.status(201).json(addedStall)
    } catch (err) {
        res.status(500).json(`error adding cart`)
        console.log(err, 'error from add cart')
    }
}