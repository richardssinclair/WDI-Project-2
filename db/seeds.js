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
},{
  name: 'The Groucho',
  image: 'http://i.dailymail.co.uk/i/pix/2016/05/26/01/20DEE4E200000578-3609872-image-a-43_14642223  75777.jpg',
  description: 'Very nice',
  location: 'Dean St Soho, London',
  lat: '51.5131825',
  lng: '-0.134139'

}];

pubs.forEach((pub) => {
  Pub.create(pub, (err, pub) => {
    if (err) return console.log(err);
    return console.log(`${pub.name} was created`);
  });
});

///need to look up marker stufff
