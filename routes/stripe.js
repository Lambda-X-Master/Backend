require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK);
const querystring = require('querystring');
const express = require('express');
const router = express.Router();
const config = require('../config.default');
const request = require('request');



router.get('/authorize', (req, res) => {
    req.session.state = Math.random()
    .toString(36)
    .slice(2);
    let parameters = {
        client_id: process.env.STRIPE_CLIENT_ID,
        state: req.session.state
      };
      parameters = Object.assign(parameters, {
        redirect_uri: 'http://localhost:5000' + '/stripe/token',
        'stripe_user[business_type]': req.body.type || 'individual',
        'stripe_user[business_name]': req.body.businessName || undefined,
        'stripe_user[first_name]': req.body.firstName || undefined,
        'stripe_user[last_name]': req.body.lastName || undefined,
        'stripe_user[email]': req.body.email || undefined,
        'stripe_user[street_address]': req.body.address || undefined,
        'stripe_user[city]': req.body.city || undefined,
        'stripe_user[zip]': req.body.postalCode || undefined,
        'stripe_user[state]': req.body.city || undefined,
        'stripe_user[country]': req.body.country || undefined,
        // 'suggested_capabilities[]': 'card_payments'
      });
      console.log('Starting Express flow:', parameters);
      // Redirect to Stripe to start the Express onboarding flow
      res.send(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))
    
    });

    router.get('/token', async (req, res) => {
      // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
      // if (req.session != req.query.state) {
      //   res.redirect('/pilots/signup');
      // }
      // Post the authorization code to Stripe to complete the Express onboarding flow
      console.log('req.query', req.query)
      request.post(
        config.stripe.tokenUri,
        {
          form: {
            grant_type: 'authorization_code',
            client_id: config.stripe.clientId,
            client_secret: config.stripe.secretKey,
            code: req.query.code,
          },
          json: true,
        },
        (err, response, body) => {
          if (err || body.error) {
            console.log('The Stripe onboarding process has not succeeded.');
            console.log('err', err, body.err)
          } else {
            // Update the model and store the Stripe account ID in the datastore:
            // this Stripe account ID will be used to issue payouts to the pilot
            // req.user.stripeAccountId = body.stripe_user_id;
            // req.user.save();
            res.status(200).json(response)
            console.log('success!')
          }
          // Redirect to the Rocket Rides dashboard
          // req.flash('showBanner', 'true');
          // res.redirect('/');
        }
      );
    });

router.post('/stripe-dashboard', (req, res) => {

  const { stripe_acc_id } = req.body
  stripe.accounts.createLoginLink(
    stripe_acc_id,
    function(err, link) {
      
      if(err) {
        res.status(300).json({message: 'Incorrect account', err})
      } else {
        res.status(200).json(link)
      }
    }
  );
})

    module.exports = router;