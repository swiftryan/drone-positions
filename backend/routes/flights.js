const express = require('express');
const router = express.Router();

const flightService = require('../services/flight-service');

router.get("/", function (req, res){
    res.send(flightService.getFlights());
});

module.exports = router;