const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
    title: String,
    code: String,
    users : Array
  }, {
    timestamps: true
  });

module.exports = mongoose.model('sucursales', sucursalSchema);
