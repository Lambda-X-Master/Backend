const Market = require("../models/market");
const db = require("../database/dbconfig");

exports.getAllMarkets = async (req, res, next) => {
  try {
    const markets = await market.findAllMarkets();
    res.status(200).json(markets);
  } catch (err) {
    res.status(500).json(`There was an error getting all markets`);
  }
};

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

exports.addMarketByFirebaseId = async (req, res) => {
  try {
    const firebase_id = req.params.firebaseId;
    if (!firebase_id) {
      res.status(404).json({ message: `You are missing firebase Id` });
    } else {
      let market = req.body;
      console.log("Market", market);
      const newMarket = await market.addMarketByFirebaseId(
        market,
        fireabase_id
      );
      console.log("Added market", newMarket);
      res.status(200).json(newMarket);
    }
  } catch (err) {
    res.status(500).json(`Can not add market: ${err}`);
    console.log(err);
  }
};
