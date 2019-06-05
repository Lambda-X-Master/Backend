const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendorRoutes.js');
const productsRoutes = require("./routes/product");
const marketRoutes = require("./routes/markets");
const stallsRoutes = require("./routes/stall");

const app = express()

app.use(express.json());
app.use(cors());
app.use(helmet());
//

app.use('/users', usersRoutes);
app.use('/markets', marketRoutes);
app.use('/vendor', vendorRoutes);
app.use('/users', usersRoutes)
app.use("/products", productsRoutes);
app.use("/stalls", stallsRoutes);

app.get('/', (req, res) => {
    res.send(`sanity check`)
})
module.exports = app
