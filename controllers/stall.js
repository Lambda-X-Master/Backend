const Stalls = require("../models/stall");

exports.getStalls =  async (req, res, next) => {
    try{
        const allStalls = Stalls.getStalls();
        res.status(200).json(allStalls);
    }
    catch(err) {
        res.status(500).json(`No stalls found: ${err}`);
        console.log(err);
    }
}

exports.getStallsByMarketId =  async (req, res, next) => {
    try {
        const marketId = req.params.market_id;
        console.log("market id,", marketId);
        if(!marketId){
            res.status(404).json({errorMessage: "You are missing a market id"})
        }
        else {
            const stallData = await Stalls.getStallsByMarketId(marketId);
            console.log("Stall Data:", stallData);
            res.status(200).json(stallData);
        }
    }
    catch(err) {
        res.status(500).json(`No stalls found: ${err}`);
        console.log(err);
    }
}

exports.addStallByMarketId = async (req, res, next) => {
    try {
        const marketId = req.params.market_id;
        console.log("market id,", marketId);
        if(!marketId){
            res.status(404).json({errorMessage: "You are missing a market id"})
        }
        else {
            let stall = req.body;
            console.log("stall: ", stall);
            const addedStall = await Stalls.addStallByMarketId(stall,marketId);
            console.log("Added Stall:", addedStall);
            res.status(200).json(addedStall);
        }
    }
    catch(err) {
        res.status(500).json(`Cannot add stall: ${err}`);
        console.log(err);
    }
}

exports.updateStallsByStallId = async (req, res, next) => {
    try {
        const stallId = req.params.stall_id;
        console.log("stall ID:", stallId);
        if(!stallId){
            res.status(404).json({errorMessage: "You are missing a stall id"})
        }
        else {
            let stall = req.body;
            console.log("stall: ", stall);
            const updatedStall = await Stalls.updateStallByStallId(stall,stallId)
            console.log("Updated Stall:", updatedStall);
            res.status(200).json(updatedStall);
        }
    }
    catch(err) {
        res.status(500).json(`Cannot update stall: ${err}`);
        console.log(err);
    }
}

exports.removeStallsByStallId = async (req, res, next) => {
    try {
        const stallId = req.params.stall_id;
        console.log("stall ID:", stallId);
        if(!stallId){
            res.status(404).json({errorMessage: "You are missing a stall id"})
        }
        else {
            const deletedStall = await Stalls.deleteStallByStallId(stallId);
            console.log("Deleted stall", deletedStall);
            res.status(200).json(deletedStall);
        }
    }
    catch(err) {
        res.status(500).json(`Cannot delete stall: ${err}`);
        console.log(err);
    }
}