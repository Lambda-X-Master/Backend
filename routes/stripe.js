require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK);
const querystring = require('querystring');
const express = require('express');
const router = express.Router();


router.get('/authorize', (req, res) => {
    let parameters = {
        client_id: process.env.STRIPE_CLIENT_ID,
        state: Math.random()
        .toString(36)
        .slice(2)
      };
    
      parameters = Object.assign(parameters, {
        redirect_uri: 'http://localhost:3000',
        'stripe_user[business_type]': req.body.type || 'individual',
        'stripe_user[business_name]': req.body.businessName || undefined,
        'stripe_user[first_name]': req.body.firstName || undefined,
        'stripe_user[last_name]': req.body.lastName || undefined,
        'stripe_user[email]': req.body.email || undefined,
        'stripe_user[street_address]': req.body.address || undefined,
        'stripe_user[city]': req.body.city || undefined,
        'stripe_user[zip]': req.body.postalCode || undefined,
        'stripe_user[state]': req.body.city || undefined,
        'stripe_user[country]': req.body.country || undefined
      });
      console.log('Starting Express flow:', parameters);
      // Redirect to Stripe to start the Express onboarding flow
      res.send(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))
        
    });


    module.exports = router;