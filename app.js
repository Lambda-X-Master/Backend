const express = require('express');
const cors = require('cors');
const helmet = require('helmet');




const usersRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendorRoutes.js');
const productsRoutes = require("./routes/product");
const marketRoutes = require('./routes/market');
const stallsRoutes = require("./routes/stall");
const cartRoutes = require("./routes/cart");
const stripe = require('./routes/stripe');
const app = express()


app.use(express.json());
app.use(cors());
app.use(helmet());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
