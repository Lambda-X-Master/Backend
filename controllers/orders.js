const Orders = require("../models/orders.js");
const db = require("../database/dbconfig");
const Markets = require("../models/market.js");

exports.getOrders = async (req, res, next) => {
  try {
    const allOrders = await Orders.getOrders();
    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json(`No orders found: ${err}`);
    console.log(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const id = req.params.order_id;
    console.log(id);
    const order = await Orders.getOrderById(id);
    // console.log(stall)
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: `error getting order` });
    console.log(err, "error from order by id");
  }
};

exports.getOrdersByVendorId = async (req, res, next) => {
  try {
    const vendorId = req.params.vendor_id;
    console.log("vendor id,", vendorId);
    if (!vendorId) {
      res.status(404).json({ errorMessage: "You are missing a vendor id" });
    } else {
      const orders = await Orders.getOrdersByVendorId(vendorId);
      console.log("Order Data:", orders);
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json(`No orders found: ${err}`);
    console.log(err);
  }
};

exports.addOrderByVendorId = async (req, res, next) => {
  try {
    const vendorId = req.params.vendor_id;
    console.log("vendor id,", vendorId);
    if (!vendorId) {
      res.status(404).json({ errorMessage: "You are missing a vendor id" });
    } else {
      const orders = req.body;
      const OrdersToInsert = orders.map(order => ({
        vendor_id: vendorId,
        stall_id: order.stall_id,
        market_id: order.market_id,
        market_name: order.market_name,
        size: order.size,
        price: order.price
      }));
      console.log("OrdersToInsert: ", OrdersToInsert);

      const addedOrder = await Orders.addOrderByVendorId(
        OrdersToInsert,
        vendorId
      );

      console.log("Added Order:", addedOrder);
      res.status(200).json(addedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot add order: ${err}`);
    console.log(err);
  }
};

exports.updateOrderByOrderId = async (req, res, next) => {
  try {
    const orderId = req.params.order_id;
    console.log("vendor ID:", orderId);
    if (!orderId) {
      res.status(404).json({ errorMessage: "You are missing a vendor id" });
    } else {
      let order = req.body;
      const updatedOrder = await Orders.updateOrderByOrderId(order, orderId);
      console.log("Updated Order:", updatedOrder);
      res.status(200).json(updatedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot update order: ${err}`);
    console.log(err);
  }
};

exports.removeOrderByOrderId = async (req, res, next) => {
  try {
    const orderId = req.params.order_id;
    console.log("order ID:", orderId);
    if (!orderId) {
      res.status(404).json({ errorMessage: "You are missing a order id" });
    } else {
      const deletedOrder = await Orders.deleteOrderByOrderId(orderId);
      console.log("Deleted stall", deletedOrder);
      res.status(200).json(deletedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot delete order: ${err}`);
    console.log(err);
  }
};

exports.removeOrdersByVendorId = async (req, res, next) => {
  try {
    const vendorId = req.params.vendorId;
    console.log("vendor ID:", vendorId);
    if (!vendorId) {
      res.status(404).json({ errorMessage: "You are missing a vendor id" });
    } else {
      const deletedOrders = await Orders.deleteOrdersByVendorId(vendorId);
      console.log("Deleted orders", deletedOrders);
      res.status(200).json(deletedOrders);
    }
  } catch (err) {
    res.status(500).json(`Cannot delete order: ${err}`);
    console.log(err);
  }
};
