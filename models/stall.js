const db = require("../database/dbconfig");

async function getStalls() {
    return db("stall").select("id","size", "market_id", "available");
}

getStallsById = (id)  => {
    return db('stall')
        .where({id})
}

async function getStallsByMarketId(marketId) {
    try{
        return db("stall")
            // .innerJoin('market', 'stall.market_id, market.firebase_id')
            // .select('stall.id', 'stall.market_id', 'stall.price', 'stall.size')
            .where({market_id: marketId})
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
    getStallsById,
    getStallsByMarketId,
    addStallByMarketId,
    updateStallByStallId,
    deleteStallByStallId
}