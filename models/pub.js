const mongoose = require('mongoose');

const pubSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  location: String,
  lat: String,
  lng: String
});

module.exports = mongoose.model('Pub', pubSchema);
