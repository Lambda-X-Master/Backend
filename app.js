const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const usersRoutes = require('./routes/users');
const app = express()

app.use(express.json());
app.use(cors());
app.use(helmet());



app.use('/users', usersRoutes)
app.get('/', (req, res) => {
    res.send(`sanity check`)
})
module.exports = app
