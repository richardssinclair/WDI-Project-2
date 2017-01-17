const mongoose    = require('mongoose');
const Pub         = require('../models/pub');
const config      = require('../config/config');

mongoose.connect(config.db);

Pub.collection.drop();

const pubs = [{
  name: 'The Dove',
  image: 'https://e5escapades.files.wordpress.com/2011/09/dove.jpg',
  description: 'the first pint',
  location: 'Broadway Market',
  loc: [-0.061719,51.536365]
  
},{
  name: 'The Cat & Mutton',
  image: 'https://www.we-heart.com/upload-images/thecatmuttonlondon7.jpg',
  description: 'Pint 2 or 3 or 6...',
  location: 'Broadway Market',
  loc: [-0.060968,51.537466]
},{
  name: 'Bao Bar',
  image: 'https://www.we-heart.com/upload-images/thecatmuttonlondon7.jpg',
  description: 'Pint 8 with a bit of dance...',
  location: 'Netil House',
  loc: [-0.0590461, 51.5376637]
},{
  name: 'The Taproom',
  image: 'http://cdn.wanderlust.co.uk/contentimages/wanderlust/li-cropped-ldn-fields.jpg?maxwidth=460',
  description: 'Pint 11.. starting to regret this..',
  location: 'Off Mare Street',
  loc: [-0.058092, 51.538698]
},{
  name: 'Oslo Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'Oslo.. pint 14..',
  location: ' Amhurst Rd London E8 1LL',
  loc: [-0.055522,51.547144]
},{
  name: 'The Dalston Jazz Bar',
  image: 'http://farm3.static.flickr.com/2697/4052751522_b97db9dd47.jpg',
  description: 'The Jazz bar invites you on a sensory and adventurous journey through gin',
  location: '4 Bradbury St, London N16 8JN',
  loc: [-0.076286,51.548714]
},{
  name: 'The Black Horse',
  image: 'https://farm6.static.flickr.com/5715/30972859610_4befedd46c_b.jpg',
  description: 'Darts and beer...',
  location: '40 Leman St, London E1 8EU',
  loc: [-0.070739,51.513742]
},{
  name: 'Leman Street Tavern',
  image: 'http://www.townfish.com/wp-content/uploads/2016/04/rsz_leman_st_tavern_dining.jpg',
  description: 'NOICE....',
  location: '4 Bradbury St, London N16 8JN',
  loc: [-0.070274,51.513720]
},{
  name: 'The Culpepper',
  image: 'http://www.theculpeper.com/wp-content/uploads/2014/11/Culpeper_Pub_3.jpg',
  description: 'The Culpepper... classic',
  location: 'London E1 6LP',
  loc: [-0.072929,51.516847]
},{
  name: 'The Ten Bells',
  image: 'https://media-cdn.tripadvisor.com/media/photo-s/02/8c/8f/28/filename-various-5-jpg.jpg',
  description: 'Jack the ripper pub...',
  location: 'London E1 6QQ',
  loc: [-0.074321,51.519344]
  // lat: '51.519344',
  // lng: '-0.074321'
},{
  name: 'Bagle Bake',
  image: 'http://www.femalefoodie.com/wp-content/uploads/2016/03/image-14-1024x683.jpg',
  description: 'Food Stop....',
  location: '4 Bradbury St, London N16 8JN',
  loc: [-0.071743,51.524525]
  // lat: '51.524525',
  // lng: '-0.071743'
},{
  name: 'Blues Kitchen Shoreditch',
  image: 'http://media.fyre.co/Ke5fXNWBT2mvubCQpOrY_DSC_1103.JPG',
  description: 'blues kitchen in the ditch of shore...',
  location: 'Shoreditch',
  loc: [-0.080173,51.526524]
  // lat: '51.526524',
  // lng: '-0.080173'
},{
  name: 'Bar and Co',
  image: 'https://scontent-a.cdninstagram.com/hphotos-xap1/t51.2885-15/1597218_203007176574328_806588239_s.jpg',
  description: 'Portuguese beer and sandwich.. bring on the meat....',
  location: 'Pratt street, Camden',
  loc: [-0.139471,51.537874]
  // lat: '51.537874',
  // lng: '-0.139471'
},{
  name: 'Camden Head',
  image: 'https://pbs.twimg.com/profile_images/582575219686137857/YkL6EeZX.jpg',
  description: 'avoid...',
  location: 'Camden',
  loc: [-0.140995,51.537265]
  // lat: '51.537265',
  // lng: '-0.140995'
},{
  name: 'The Worlds End',
  image: 'http://www.true-london.com/wp-content/uploads/IMG_0387-e1362658334598.jpg',
  description: 'Strange place',
  location: 'Camden Town',
  loc: [-0.142261,51.539119]
  // lat: '51.539119',
  // lng: '-0.142261'
},{
  name: 'The Camden Eye',
  image: 'http://www.by-invitation.com/wp-content/uploads/2013/01/The-Camden-Eye-Pub.jpg',
  description: 'Open mic mondays.',
  location: 'Camden',
  loc: [-0.142239,51.539462]
  // lat: '51.539462',
  // lng: '-0.142239'
},{
  name: 'The Dublin Castle',
  image:
  'http://londonsubscene.net/wp-content/uploads/2014/09/6646148277_bb11c79f48_z.jpg',
  description: 'Open mic teusdays',
  location: 'Camden',
  loc: [-0.145550,51.537432]
  // lat: '51.537432',
  // lng: '-0.145550'
},{
  name: 'The Elephants Head',
  image: 'http://www.coolplaces.co.uk/system/images/4930/the-elephants-head-eat-drink-bars-pubs-large.jpg',
  description: 'open mic wednsdays.. nice pub',
  location: 'Camden High Street',
  loc: [-0.143976,51.540713]
  // lat: '51.540713',
  // lng: '-0.143976'
},{
  name: 'The Lock Tavern',
  image: 'http://mrfogg.co.uk/wp-content/uploads/2009/10/img_9589.jpg',
  description: 'good gigs.. nice pub',
  location: 'Near Camden Market',
  loc: [-0.147687,51.542811]
  // lat: '51.542811',
  // lng: '-0.147687'
},{
  name: 'The Monarch',
  image: 'http://monarchbar.com/wp-content/uploads/2016/06/monarch-gallery-7.jpg',
  description: 'Pool, decent gigs..',
  location: 'Near Camden Market',
  loc: [-0.148429,51.542897]
  // lat: '51.542897',
  // lng: '-0.148429'
},{
  name: 'Camden Assembly',
  image: 'http://mixmag.net/assets/uploads/images/_columns2/camden-assembly.jpg',
  description: 'good gigs.. nice pub',
  location: 'Near Camden Market',
  loc: [-0.149224,51.543059]
  // lat: '51.543059',
  // lng: '-0.149224'
},{
  name: 'Quinns',
  image: 'http://www.kentishtowner.co.uk/wp-content/uploads/2012/01/quinnbluesky-e1393864498579.jpg',
  description: 'strange place allways open...',
  location: 'Camden/Kentish Town',
  loc: [-0.141994,51.542838]
  // lat: '51.542838',
  // lng: '-0.141994'
}
];

pubs.forEach((pub) => {
  Pub.create(pub, (err, pub) => {
    if (err) return console.log(err);
    return console.log(`${pub.name} was created`);
  });
});

///need to look up marker stufff
