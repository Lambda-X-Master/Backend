const market = require('../models/market');
const user = require('../models/users');

exports.getAllMarkets = async (req, res, next) => {
    try {
        const markets = await market.findAllMarkets()
        res.status(200).json(markets)
    } catch (err) {
        res.status(500).json(`There was an error getting all markets`)
        console.log(err, 'error from get all markets')
    }
}

//Add new market
exports.addMarket = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id, 'id from add market')
        const marketData = req.body
        const newMarket = await market.addMarket(marketData)
        res.status(204).json(newMarket)
    } catch (err) {
        res.status(500).json(`error adding market`)
        console.log(err, 'error from add market')
    }
}

//Market by ID
exports.getMarketById = async (req, res, next) => {
    const id = req.params.firebase_id;
    console.log(id);
    db.findByMarketID(id)
      .then(marketinfo => {
        res.status(200).json(marketinfo);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "Could not get Markets associated with that ID" });
      });
}

exports.deleteMarket = async (req, res, next) => {
    const id = req.params.firebase_id;
    db.deleteByMarketId(id)
    .then(() => {
        res.status(200).json({ message: "Market Was Successfully Deleted" });
      })
      .catch(error => {
        res.status(500).json({error: 'Could Not Delete This Market'});
      });
}

exports.editMarket = async (req, res, next) => {
    const id = req.params.firebase_id;
    db.updateByMarketId(id)
    .then(() => {
        res.status(200).json({message: 'Market Info Was Updated'})
    })
    .catch(error => {
        res.status(500).json({error: `Could Not Update This Market's Information`});
      });
}