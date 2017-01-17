const express         = require('express');
const router          = express.Router();
const authentications = require('../controllers/authentications');
const pubs            = require('../controllers/pubs');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);
router.route('/pubs')
.get(pubs.index);




module.exports = router;
