const cart = require('../models/cart');

exports.getVendorCart = async (req, res, next) => {
    try {
        const id = req.params.id
        const vendorCart = await cart.getCartById(id)
        res.status(200).json(vendorCart)
    } catch (err) {
        res.status(500).json({message: `error getting vendors cart`})
        console.log(err, 'error from get vendor cart')
    }
}

exports.getCart = async (req, res, next) => {
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

exports.addCart = async (req, res, next) => {
    try {
        const id = req.params.id
        const cartInfo = req.body
        console.log(req.body, 'add cart req.body')
        // console.log(id, 'id from add market')
        // const marketData = req.body
        const newMarket = await cart.addCart(id)
        console.log(newMarket)
        res.status(201).json(newMarket)
    } catch (err) {
        res.status(500).json(`error adding cart`)
        console.log(err, 'error from add cart')
    }
}