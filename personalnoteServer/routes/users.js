var express = require('express');
var router = express.Router();

/* GET users listing. */
// 二级路由
// 访问 user
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 访问 user/test
router.get('/test', function(req, res, next) {
  res.send('test');
});

module.exports = router;
