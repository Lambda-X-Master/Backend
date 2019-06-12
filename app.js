const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const config = require('./config.default');

const usersRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendorRoutes.js');
const productsRoutes = require("./routes/product");
const marketRoutes = require('./routes/market');
const stallsRoutes = require("./routes/stall");
const cartRoutes = require("./routes/cart");
const stripe = require('./routes/stripe');
const app = express()

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser(config.secret));
app.use(
  session({
    cookie: {maxAge: 60000},
    secret: config.secret,
    signed: true,
    resave: true,
  })
);



app.use('/users', usersRoutes);

app.use('/stripe', stripe)
app.use('/markets', marketRoutes);
app.use('/vendor', vendorRoutes);
app.use("/products", productsRoutes);
app.use("/stalls", stallsRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send(`sanity check`)
});

module.exports = app
