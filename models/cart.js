const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	trip: String,
	hour: String,
	price: Number,
	date : Date,
});

const Item = mongoose.model('cart', itemSchema);

module.exports = Item;