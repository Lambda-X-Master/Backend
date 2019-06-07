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

exports.addMarket = async (req, res) => {
  try {
    const newMarket = req.body;
    if (newMarket) {
      const market = await Market.addMarket(newMarket);
      console.log(market, "market added");
      res.status(200).json(market);
    } else {
      res.status(400).json({ message: "Must enter all input fields" });
    }
  } catch (error) {
    res.status(500).json({
      error: `There was an error adding market to the database: ${error}`
    });
  }
};

//Market by ID
exports.getMarketById = async (req, res, next) => {
    try {
        const firebase_id = req.params.id;
        console.log(firebase_id, 'get by id' );
        if (firebase_id) {
            const marketinfo = await market.findByMarketID(firebase_id)
            console.log(marketinfo)
            res.status(200).json(marketinfo);
        } else {
            res.status(400).json({message: `No market by that id found`})
        }
  
    }
    
      catch(error) {
        res
          .status(500)
          .json({ error: "Could not get Markets associated with that ID" });
      };
}

exports.deleteMarket = async (req, res, next) => {
    try {
        const firebaseId = req.params.id;
        console.log(firebaseId)
        const marketData = await market.deleteByMarketId(firebaseId)
        res.status(200).json(`item deleted successfully`);
    }
      catch(error) {
        res.status(500).json({error: 'Could Not Delete This Market'});
      };
}

exports.editMarket = async (req, res, next) => {
    try {
        const firebaseId = req.params.id
        console.log(req.params)
        const marketData = req.body
        const updatedMarket = await market.updateByMarketId(firebaseId, marketData);
        console.log(req.body, 'req.body')
          res.status(200).json(updatedMarket)
        
      } catch (error) {
          console.log(error)
        res.status(500).json({ message: `Error updating market: ${error}` });
      }
}
