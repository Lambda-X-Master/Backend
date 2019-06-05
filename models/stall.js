const db = require("../database/dbconfig");

async function getStalls() {
    return db("stall");
}

async function getStallsByMarketId(marketId) {
    try{
        return db("stall").where({market_id: marketId})
    }
    catch(err){
        console.log(err);
    }
}

async function addStallByMarketId(stall, marketId) {
    try{
        let addedStall = {
            ...stall,
            market_id: marketId
        };
        console.log("Our added stall :",addedStall);
        return db("stall").insert(addedStall);
    }
    catch(err){
        console.log(err);
    }
}

async function updateStallByStallId(stall, stallId) {
    try{
        console.log("Our updated stall :", stall);
        return db("stall").where({id: stallId}).update(stall);
    }
    catch(err){
        console.log(err);
    }
}

async function deleteStallByStallId(stallId) {
    try{
        return db("stall").where({id: stallId}).delete();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getStalls,
    getStallsByMarketId,
    addStallByMarketId,
    updateStallByStallId,
    deleteStallByStallId
}