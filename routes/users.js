var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


/*User = {
	url: null,
	title: null,
	creation: null,
	body: null
}

module.exports = users;*/