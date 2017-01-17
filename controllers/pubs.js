const Pub = require('../models/pub');

function pubsIndex(req, res){
  const coords = [];
  coords[0]    = req.query.longitude || 0;
  coords[1]    = req.query.latitude || 0;
  const limit  = Number(req.query.limit) || 4;

  Pub.find({
    loc: {
      $near: coords
    }
  })
  .limit(limit)
  .exec((err, pubs) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ pubs });
  });
}

module.exports = {
  index: pubsIndex
};
