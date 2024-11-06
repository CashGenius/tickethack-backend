var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/displayBookings', function(req,res){
  Booking.find({})
  .then(data =>{
      console.log(data)
      res.json({result: true, items: data})
  })
})


module.exports = router;