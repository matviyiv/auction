var express = require('express'),
    router  = express.Router(),
    title   = 'Auction Online';

router.use('/bid', require('./bids'));

/**
* Home page
* Inject common things here
*/
router.get('/', function(req, res) {
  req.title = title;
  res.render('main', {
    title: title
  });
});

module.exports = router;