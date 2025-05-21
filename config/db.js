const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://0.0.0.0/learn').then(()=> {
    console.log('Connected to MongoDB database');
})

module.exports = connection;