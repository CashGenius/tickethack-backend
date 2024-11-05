const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:IJfElssjlAhcDysk@cluster0.p6urc.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
 .catch(error => console.error(error));