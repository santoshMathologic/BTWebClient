var express = require('express');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');

var user = require("./user.js");
var role = require("./role.js");
var login = require("./auth/login.js");
var reg = require("./auth/login.js");
var upload = require("./upload.js");
var lOut = require("./logout.js");

var uploadDest = Multer({
  dest: './uploads'

});


router.get('/login',login.userLogin);
router.post('/registeration', reg.registerUser);

router.post('/api/v2/uploads/timetable', uploadDest.single("file"), upload.parseUploadFile);

router.get('/logout', lOut.logOut);

module.exports = router;
