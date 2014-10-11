var express = require('express'),
    router  = express.Router(),
    settings   = require('../settings').appSettings;

router.use('/bid', require('./bids'));

router.get('/', function(req, res) {
  req.title = settings.title;
  res.render('main', {
    title: settings.title
  });
});

module.exports = router;