const db = require('../db/stubbed-data');

let service = {
    getFlights() {
        return db.flights
    }
}

module.exports = service;