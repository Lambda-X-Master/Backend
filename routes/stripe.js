require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK);
const querystring = require('querystring');
const express = require('express');
const router = express.Router();
const request = require('request');



router.post('/authorize', (req, res) => {
  console.log(req.body)
  console.log(req.params)
  console.log('requser', req.user)
  
    let parameters = {
        client_id: process.env.STRIPE_CLIENT_ID,
       
      }
      parameters = Object.assign(parameters, {
        redirect_uri: 'https://market-organizer.herokuapp.com' + '/stripe/token',
        'stripe_user[business_type]': req.body.type || 'individual',
        'stripe_user[business_name]': req.body.market_name || undefined,
        'stripe_user[first_name]': req.body.contact_first_name || undefined,
        'stripe_user[last_name]': req.body.contact_last_name || undefined,
        'stripe_user[email]': req.body.email || undefined,
        'stripe_user[street_address]': req.body.address || undefined,
        'stripe_user[city]': req.body.city || undefined,
        'stripe_user[zip]': req.body.zipcode || undefined,
        'stripe_user[state]': req.body.state || undefined,
        'stripe_user[country]': req.body.country || undefined,
        'stripe_user[phone_number]': req.body.phone_number || undefined,
        'suggested_capabilities[]': 'card_payments'
      }),
      console.log('Starting Express flow:', parameters);
      // Redirect to Stripe to start the Express onboarding flow
      console.log(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))
      res.status(200).send(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))
  
    });

    //Martket Token 

    //Martket Token 
    router.get('/token', async (req, res) => {
      // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
      // if (req.session != req.query.state) {
      //   res.redirect('/pilots/signup');
      // }
      // Post the authorization code to Stripe to complete the Express onboarding flow
      console.log('req.query', req.query)
        request.post(
          process.env.STRIPE_TOKEN_URI,
          {
            form: {
              grant_type: 'authorization_code',
              client_id: process.env.STRIPE_CLIENT_ID,
              client_secret: process.env.STRIPE_SK,
              code: req.query.code,
            },
            json: true,
          },
          (err, response, body) => {
            if (err || body.error) {
              console.log('The Stripe onboarding process has not succeeded.');
              console.log('err', err, body)
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
  console.log(stripe_acc_id)
  stripe.accounts.createLoginLink(
    stripe_acc_id,
    function(err, link) {
      
      if(err) {
        console.log(err)
        res.status(300).json({message: 'Incorrect account', err})
      } else {
        res.status(200).json(link)
      }
    }
  );
})

router.post('/charge', async (req, res) => {
  const { amount, token, stripe_account } =  req.body

  let error;
  let status;
  try {
    // stripe.customers.createSource(
    //   'cus_FFQFvvPWFFweNv',
    //   {
    //     source: 'src_1EkvPFDRAKlfguHPqIQzElgr',
    //   },
    //   function(err, source) {
    //     // asynchronously called
    //   }
    // )
    // const customer = await stripe.customers.create({
    //   email: email,
    //   source: token
    // })
  
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      source: token,
      application_fee_amount: 150,
    }, {
      stripe_account: stripe_account,
    }
    )
    console.log('charge:', {charge})
    status = "success";
  } catch(error) {
    console.error(error)
    status = "failure"
  }
  
  res.json({ error, status })
})

    module.exports = router;