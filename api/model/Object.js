const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Objet = new Schema ({
  title: { type: String, required: true, index: { unique: true } },
});

module.exports = mongoose.model('Object', Objet)