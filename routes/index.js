var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */

router.get('/login', function(req, res, next) {
   res.sendFile(path.join(__dirname, '../public/login/', 'login.html'));
});


module.exports = router;
