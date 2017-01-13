const mongoose    = require('mongoose');
const Pub         = require('../models/pub');
const config      = require('../config/config');
const path        = require('path');

mongoose.connect(config.db);

Pub.collection.drop();

const pubs = [{

  name: 'The Groucho',
  image: 'http://i.dailymail.co.uk/i/pix/2016/05/26/01/20DEE4E200000578-3609872-image-a-43_14642223  75777.jpg',
  description: 'Very nice',
  location: 'Dean St Soho, London',
  lat: '51.5131825',
  lng: '-0.134139'
},{
  name: 'The Dove',
  image: 'https://e5escapades.files.wordpress.com/2011/09/dove.jpg',
  description: 'the first pint',
  location: 'Broadway Market',
  lat: '51.5363808',
  lng: '0.0638915'
},{
  name: 'The Cat & Mutton',
  image: 'https://www.we-heart.com/upload-images/thecatmuttonlondon7.jpg',
  description: 'Pint 2 or 3 or 6...',
  location: 'Broadway Market',
  lat: '51.5373',
  lng: '0.0611623'
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
  lat: '51.5376637',
  lng: '-0.0590461'
},{
  name: 'The Dalston Jazz Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'The Jazz bar invites you on a sensory and adventurous journey through gin',
  location: '4 Bradbury St, London N16 8JN',
  lat: '51.5487',
  lng: '0.0762'
}];

pubs.forEach((pub) => {
  Pub.create(pub, (err, pub) => {
    if (err) return console.log(err);
    return console.log(`${pub.name} was created`);
  });
});

///need to look up marker stufff
