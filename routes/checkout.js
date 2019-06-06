const express = require('express');
const router = express().router();
const stripe = require('stripe')('pk_test_R4kvaWNKnku78DL2dwXpLiTq00R1MdFKhb');

// router.post('/checkout', (req, res) => {
//     const { email } = req.body;

// })
