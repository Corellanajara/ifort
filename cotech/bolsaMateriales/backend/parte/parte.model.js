const mongoose = require('mongoose');

const parteschema = mongoose.Schema({
  nombre : String,
  codigo_jurisdiccion : String,

}, {
    timestamps: true
});


module.exports = mongoose.model('partes', parteschema);
