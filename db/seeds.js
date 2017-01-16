const mongoose    = require('mongoose');
const Pub         = require('../models/pub');
const config      = require('../config/config');
const path        = require('path');

mongoose.connect(config.db);

Pub.collection.drop();

const pubs = [{

  name: 'The Dove',
  image: 'https://e5escapades.files.wordpress.com/2011/09/dove.jpg',
  description: 'the first pint',
  location: 'Broadway Market',
  lat: '51.536365',
  lng: '-0.061719'
},{
  name: 'The Cat & Mutton',
  image: 'https://www.we-heart.com/upload-images/thecatmuttonlondon7.jpg',
  description: 'Pint 2 or 3 or 6...',
  location: 'Broadway Market',
  lat: '51.537466',
  lng: '-0.060968'
},{
  name: 'Bao Bar',
  image: 'https://www.we-heart.com/upload-images/thecatmuttonlondon7.jpg',
  description: 'Pint 8 with a bit of dance...',
  location: 'Netil House',
  lat: '51.5376637',
  lng: '-0.0590461'
},{
  name: 'The Taproom',
  image: 'http://cdn.wanderlust.co.uk/contentimages/wanderlust/li-cropped-ldn-fields.jpg?maxwidth=460',
  description: 'Pint 11.. starting to regret this..',
  location: 'Off Mare Street',
  lat: '51.538698',
  lng: '-0.058092'
},{
  name: 'The Dalston Jazz Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'The Jazz bar invites you on a sensory and adventurous journey through gin',
  location: '4 Bradbury St, London N16 8JN',
  lat: '51.548714',
  lng: '-0.076286'
}];

pubs.forEach((pub) => {
  Pub.create(pub, (err, pub) => {
    if (err) return console.log(err);
    return console.log(`${pub.name} was created`);
  });
});

///need to look up marker stufff
