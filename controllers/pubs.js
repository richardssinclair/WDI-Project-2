const Pub = require('../models/pub');

function pubsIndex(req, res){
  Pub.find((err, pubs) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ pubs });
  });
}

module.exports = {
  index: pubsIndex
};
