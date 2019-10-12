var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

router.post('/user/register', UserController.registerUser);

module.exports = router;