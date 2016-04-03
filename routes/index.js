var express = require('express');
var router = express.Router();
var script = require('./apiCall.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get Hello World page */
router.get('/helloworld', function(req,res){
	res.render('helloworld', {title: 'hello, World'});
});

/*router.get('/apiCall', function(req, res, next) {

	script.execute();
});*/


module.exports = router;


