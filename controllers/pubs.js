const Pub = require('../models/pub');

function pubsIndex(req, res){
  var coords = [];
  coords[0] = req.query.longitude || 0;
  coords[1] = req.query.latitude || 0;

  Pub.find({
    loc: {
      $near: coords
    }
  }, (err, pubs) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ pubs });
  });
}

module.exports = {
  index: pubsIndex
};
