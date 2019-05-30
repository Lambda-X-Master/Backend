const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express()

app.use(express.json());
app.use(cors());
app.use(helmet());
app.get('/', (req, res) => {
    res.send(`sanity check`)
})
module.exports = app
