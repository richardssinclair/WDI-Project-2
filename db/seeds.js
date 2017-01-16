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
  name: 'Oslo Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'Oslo.. pint 14..',
  location: ' Amhurst Rd London E8 1LL',
  lat: '51.547144',
  lng: '-0.055522'
},{
  name: 'The Dalston Jazz Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'The Jazz bar invites you on a sensory and adventurous journey through gin',
  location: '4 Bradbury St, London N16 8JN',
  lat: '51.548714',
  lng: '-0.076286'
},{////////
  name: 'The Black Horse',
  // image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'Darts and beer...',
  location: '40 Leman St, London E1 8EU',
  lat: '51.513742',
  lng: '-0.070739'
},{
  name: 'Leman Street Tavern',
  image: '////http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg///',
  description: 'NOICE....',
  location: '4 Bradbury St, London N16 8JN',
  lat: '51.513720',
  lng: '-0.070274'
},{
  name: 'The Culpepper',
  image: 'NEW PHOTO',
  description: 'The Culpepper... classic',
  location: 'London E1 6LP',
  lat: '51.516847',
  lng: '-0.072929'
},{
  name: 'The Ten Bells',
  image: 'New Photo.....',
  description: 'Jack the ripper pub...',
  location: 'London E1 6QQ',
  lat: '51.519344',
  lng: '-0.074321'
},{
  name: 'Bagle Bake',
  image: 'Bagle bake lady',
  description: 'Food Stop....',
  location: '4 Bradbury St, London N16 8JN',
  lat: '51.524525',
  lng: '-0.071743'
},{
  name: 'Blues Kitchen Shoreditch',
  image: 'photo photo photo',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  lat: '51.526524',
  lng: '-0.080173'
},{
  name: 'Bar and Co',
  image: 'photo photo photo',
  description: 'Portuguese beer and sandwich.. bring on the meat....',
  location: 'Pratt street, Camden',
  lat: '51.537874',
  lng: '-0.139471'
},{
  name: 'Camden Head',
  image: 'photo photo photo',
  description: 'avoid...',
  location: 'Camden',
  lat: '51.537265',
  lng: '-0.140995'
},{
  name: '/////////////',
  image: 'photo photo photo',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  lat: '51.526524',
  lng: '-0.080173'
},{
  name: '///////////////',
  image: 'photo photo photo',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  lat: '51.526524',
  lng: '-0.080173'
},{
  name: '////////////////',
  image: 'photo photo photo',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  lat: '51.526524',
  lng: '-0.080173'
},{
  name: '/////////////////',
  image: 'photo photo photo',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  lat: '51.526524',
  lng: '-0.080173'
},{
  name: 'Blues Kitchen Shoreditch',
  image: 'photo photo photo',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  lat: '51.526524',
  lng: '-0.080173'
},{

}];

pubs.forEach((pub) => {
  Pub.create(pub, (err, pub) => {
    if (err) return console.log(err);
    return console.log(`${pub.name} was created`);
  });
});

///need to look up marker stufff
