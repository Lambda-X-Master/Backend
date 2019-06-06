const db = require('../database/dbconfig');

findAllMarkets = () => {
    return db('market').select("market_name", "contact_first_name", "contact_last_name", "address", "city", "state", "zipcode", "phone_number"); 
}

module.exports = {
    findAllMarkets
}
