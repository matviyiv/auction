var express = require('express'),
    router  = express.Router();

router.post('/bid', function(req, res, next) {
  res.json({ success: true });
});

module.exports = router;