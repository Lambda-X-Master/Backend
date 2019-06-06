const market = require('../models/market');

exports.getAllMarkets = async (req, res, next) => {
    try {
        const markets = await market.findAllMarkets()
        res.status(200).json(markets)
    } catch (err) {
        res.status(500).json(`There was an error getting all markets`)
        console.log(err, 'error from get all markets')
    }
}