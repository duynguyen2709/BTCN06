var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var jwt = require('jsonwebtoken');
var passport = require('passport');

router.post('/user/register', UserController.registerUser);

router.post('/user/login', function (req, res, next) {
    passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.json(info);
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({
                username: user.username
            }, '1612145');
            return res.json({
                token
            });
        });
    })(req, res);
});

router.get('/me', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.send("JWT không hợp lệ.");
        }
        return res.send("NGƯỜI DÙNG HIỆN TẠI: " + user);
    })(req, res, next);
});

module.exports = router;