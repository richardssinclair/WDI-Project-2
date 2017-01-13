const mongoose = require('mongoose');

const pubSchema = mongoose.Schema({
  name:        {type: String, trim: true, required: true },
  image:       {type: String, trim: true, required: true },
  description: {type: String, trim: true },
  location:    {type: String, trim: true, required: true},
  lat:         {type: String, trim: true, required: true},
  lng:         {type: String, trim: true, required: true}
});

module.exports = mongoose.model('Pub', pubSchema);
