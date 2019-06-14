const Cart = require('../models/cart');
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK);
const querystring = require('querystring');
const express = require('express');
const router = express.Router();
const request = require('request');

exports.getVendorCart = async (req, res, next) => {
    try {
        // const id = req.params.id
        console.log(typeof id, 'get cart id')
        const vendorCart = await Cart.getCartById(req.params.id)
        res.status(200).json(vendorCart)
    } catch (err) {
        res.status(500).json({message: `error getting vendors cart`})
        console.log(err, 'error from get vendor cart')
    }
}

exports.getCarts = async (req, res, next) => {
    try {
        const id = req.params.id
        cartData = await Cart.getCart()
        console.log(req.body)
        res.status(200).json(cartData)
        console.log(cartData, 'cart created')
    } catch (err){
        res.status(500).json(err)
        console.log(err, 'error from get cart')
    }
}

// exports.getCartById = async (req, res, next) => {
//     try {
//         const id = req.params.id
//         // const cartData = await Cart.getCartById(id)
//         const cartItem = await Cart.getCartItems(id)
//         // console.log(cartData, 'cart item')
//         let updatedTotal = 0
//         const price = cartItem.forEach(element => {
//             return updatedTotal += element.price 
//         });
//         const roundedTotal = Math.ceil(updatedTotal * 100) / 100
//         let total = roundedTotal
//         console.log(total, 'total')
//         res.status(200).json({cartItem, total})
//     } catch (err) {
//         res.status(500).json(err)
//         console.log(err, 'error from get cart')
//     }
// }

//test

exports.getCartById = async (req, res, next) => {
    try {
        const id = req.params.id
        const cartItem = await Cart.getCartItems(id)
        let updatedTotal = 0
        const price = cartItem.forEach(element => {
            return updatedTotal += element.price 
        });
        const total = Math.ceil(updatedTotal * 100) / 100
        res.status(200).json([cartItem, total])
        console.log(cartItem, 'cart type')
    } catch (err) {
        res.status(500).json(err)
        console.log(err, 'error from get cart')
    }
}



exports.addStallToCart = async (req, res, next) => {
    try {
        const cart_id = req.params.id;
        let stalls_id = req.body.stalls_id;
        // console.log(req, "req");
        console.log(req.body, 'stall fron at to cart')
        const addedStall = await Cart.addStallToCart(stalls_id, cart_id)
        res.status(201).json(addedStall)
    } catch (err) {
        res.status(500).json(`error adding cart`)
        console.log(err, 'error from add cart')
    }
}

// exports.checkout = async (req, res, next) => {
//     try {
        //send back from the front end the cart total and the token from stripe.js element
        // const { token, amt, stripe_account } = req.body
        // console.log(token, 'token')
        //create a customer 
        // const customer = await stripe.customers.create({
        //     email: token.email,
        //     source: token.id
        // })

        // await stripe.charges.create(
        //             {
        //               amount: amt * 100,
        //               currency: "usd",
        //               customer: customer.id,
        //               receipt_email: token.email,
        //               description: `Purchased stalls`,
        //               application_fee_amount: 250
        //             },
        //             {
        //             stripe_account: stripe_account
        //             }
        //           )

        //           console.log('Charge')
//         "amt": 10,
// "stripe_account": "acct_1EkaDZFQYZyXJBpt"
        // if (customer) {
        //     const charge = await stripe.charges.create(
        //         {
        //           amount: amt * 100,
        //           currency: "usd",
        //           customer: customer.id,
        //           receipt_email: token.email,
        //           description: `Purchased stalls`,
        //           application_fee_amount: 250
        //         },
        //         {
        //         stripe_account: stripe_account
        //         }
        //       );
    
        //       console.log("Charge:", {charge});
        // }
        
          
        // .then(customer => {
            
        //     console.log(customer, 'stripe cutomer data')
        //     const charge = stripe.charges.create({
        //         amount: amt * 100,
        //         currency: 'usd',
        //         application_fee_amount: 250,
        //         customer: customer.id
        //     },
        //         {
        //             stripe_account: stripe_account
        //         })
        //         console.log(charge, 'Charge completed')
        // })
      
        // res.status(200).json(customer)

        // stripe.charges.create({
        //     amount: amount * 100,
        //     currency: "usd",
        //     source: token,
        //     application_fee_amount: 150,
        //   }, {
        //     stripe_account: stripe_account,
        //   }).then(function(charge) {
        //     try {
        //       res.status(200).json(charge)
        //     } catch (err) {
        //       console.log(err)
        //     }
         
        //   });
//     } catch (err) {
//         res.status(500).json(err)
//         console.log('error from checkout', err)
//     }
// }

exports.checkout = async (req, res, next) => {
    try {
        const {token, amt, stripe_account, } = req.body
        const charge = await stripe.charges.create(
                    {
                      amount: amt * 100,
                      currency: "usd",
                    //   customer: customer.id,
                      receipt_email: token.email,
                      description: `Purchased stalls`,
                      application_fee_amount: 150,
                      source: token.id
                    },
                    {
                    stripe_account: stripe_account
                    }
                  );
        console.log('Charge', {charge})
        res.status(201).json(charge)

    } catch (err) {
        res.status(500).json(err)
        console.log('error from pay', err)
    }
}
exports.removeStallFromCart = async (req, res, next) => {
    try{
        const cart_id = req.params.id;
        let stalls_id = req.body.stalls_id;
        // console.log(req, "req");
        console.log(req.body, 'deletedStall')
        const removedStall = await Cart.removeStallFromCart(stalls_id, cart_id)
        res.status(201).json(removedStall)
        } catch (err) {
            res.status(500).json(`error removing cart`)
            console.log(err, 'error from removing cart')
        }
}
