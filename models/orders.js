const db = require("../database/dbconfig");

async function getOrders() {
    return db("orders").select("id","size", "vendor_id");
}

getOrderById = (id)  => {
    return db('orders')
        .where({id})
}

async function getOrdersByVendorId(vendorId) {
    try{
        return db("orders")
            // .innerJoin('market', 'stall.market_id, market.firebase_id')
            // .select('stall.id', 'stall.market_id', 'stall.price', 'stall.size')
            .where({vendor_id: vendorId})
    }
    catch(err){
        console.log(err);
    }
}

async function addOrderByVendorId(stall, vendorId) {
    try{
        let addedOrder = {
            ...stall,
            vendor_id: vendorId
        };
        console.log("Our added order :",addedOrder);
        return db("orders").insert(addedOrder);
    }
    catch(err){
        console.log(err);
    }
}

async function updateOrderByOrderId(order, orderId) {
    try{
        console.log("Our updated order :", order);
        return db("orders").where({id: orderId}).update(order);
    }
    catch(err){
        console.log(err);
    }
}

async function deleteOrderByOrderId(orderId) {
    try{
        return db("orders").where({id: orderId}).delete();
    }
    catch(err){
        console.log(err);
    }
}

async function deleteOrdersByVendorId(vendorId) {
    try{
        return db("orders").where({vendor_id: vendorId}).delete();
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    getOrders,
    getOrderById,
    getOrdersByVendorId,
    addOrderByVendorId,
    updateOrderByOrderId,
    deleteOrderByOrderId,
    deleteOrdersByVendorId
}