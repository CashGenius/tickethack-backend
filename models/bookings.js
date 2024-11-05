const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	trip: String,
	hour: String,
	price: Number,
    date : Date,
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;