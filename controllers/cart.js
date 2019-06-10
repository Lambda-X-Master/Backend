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