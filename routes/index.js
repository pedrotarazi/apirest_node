var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.render()
});

/* GET home page. */
router.get('/sites', function(req, res, next) {
  res.render('sites', { title: 'Sites MELI' });
});


module.exports = router;
