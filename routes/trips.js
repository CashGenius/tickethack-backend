var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment')

const Trip= require('../models/trips');

/* GET home page. */
router.get('/displayAllTrips', function(req, res, next) {
  Trip.find({})
  .then(data => {
    res.json({trips : data})
  })
});

// Effectuer une recherche dans la BDD trips selon la ville de départ / d'arrivée et la date souhaitée
router.post('/findTrips', function(req, res, next) {
    const departure = req.body.departure
    const arrival = req.body.arrival
    let date = req.body.date
    console.log(date)
    if (date !== "" && date !== undefined && date !== null){
        date = moment(req.body.date,'YYYY-MM-DD').format('L')
    } else {
        return res.json({result: false, error: "Missing date"})
    }
    console.log(date)
    if (departure && arrival && date){
        Trip.find({departure: new RegExp(`^${departure}$`,'i'), arrival: new RegExp(`^${arrival}$`,'i')})
        .then(data => {
            let result = []
            for (let trip of data){
                if (moment(trip.date).format('L') == date)
                result.push(trip)
            }
            if (result.length > 0){
                res.json({trips : result})
            } else {
                res.json({result : false, error: "No trip found", trips:[]})
            }
        })
    } else {
        return res.json({result: false, error: "Missing or empty body arguments"})
    }
});

module.exports = router;