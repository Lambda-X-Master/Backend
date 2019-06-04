const db = require('../database/dbconfig');

findAllMarkets = () => {
    return db('market')
}

module.exports = {
    findAllMarkets
}