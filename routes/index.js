var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("App is listening your request");
});

module.exports = router;
