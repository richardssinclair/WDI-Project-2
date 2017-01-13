const mongoose    = require('mongoose');
const Pub         = require('../models/pub');
const config      = require('../config/config');
const path        = require('path');

mongoose.connect(config.db);

Pub.collection.drop();

const pubs = [{
  name: 'The Dalston Jazz Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'The Jazz bar invites you on a sensory and adventurous meat journey amid the Jazz band.Â Our hallmark exotic dishes like kangaroos, crocodiles, frog legs, horse meat and white shark fillets.features comfortable alongside standard classics, chicken and fish and an array of inventive vegetarian options. So take a culinary walk on the wild with our exotic menu.',
  location: '4 Bradbury St, London N16 8JN',
  lat: '51.5487',
  lng: '0.0762'
}];

pub1.save(function(err, pub) {
  if (err) return console.log(err);
  console.log('Pub saved! ', pub);
});

///need to look up marker stufff
