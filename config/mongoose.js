const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
const db = mongoose.connection;
db.on("error",console.error.bind,"Error connecting to MongoDB");

db.once('open',function(){
    console.log("Connected with MongoDB");

});

module.exports = db;