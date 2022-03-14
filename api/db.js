const dotenv = require("dotenv");

dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true },);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback (req,res) {
  console.log("MongoDB Connected...");
});

module.exports = db