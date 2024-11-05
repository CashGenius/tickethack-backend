var express = require('express');
var router = express.Router();

const Item = require('../models/cart');
const Booking = require('../models/bookings')

// Ajouter un voyage dans la base de donnée panier

router.post('/addToCart', function(req, res, next) {
  const trip = req.body.trip
  const hour = req.body.hour
  const price = req.body.price
  const date = req.body.date
  const tripToAdd = new Item({
    trip: trip,
	hour: hour,
	price: price,
    date: date,
  })
  tripToAdd.save()
  .then(res.json({result: true, message:"Item ajouté au panier"}))
});

// Afficher ce que contient le panier

router.get('/displayCart', function(req,res){
    Item.find({})
    .then(data =>{
        console.log(data)
        res.json({result: true, items: data})
    })
})

// Supprimer un élément du panier

router.delete('/deleteItem', function(req,res){
    const trip = req.body.trip
    const hour = req.body.hour
    Item.deleteOne({trip : trip, hour : hour})
    .then(res.json({result: true, message: "Item supprimé du panier"}))
})

// Valider le panier et ajouter les éléments dans la base de donnée booking
router.post('/validateCart', function(req,res){
    let bookingsToAdd
    Item.find({})
    // Récupère tous les éléments contenu dans la BDD cart et les ajoute à la BDD bookings
    .then(data =>{
        for (let item of data){
            bookingsToAdd = new Booking({
                trip: item.trip,
                hour: item.hour,
                price: item.price,
                date : item.date
            })
            bookingsToAdd.save()
        }

    })
    // Supprimer tous les éléments contenus dans la BDD 
    .then(() =>{
        Item.deleteMany({})
        .then(() =>{
            (res.json({result:true, message:"Panier vidé et trajets ajoutés dans bookings"}))
        })
    })
})

module.exports = router;