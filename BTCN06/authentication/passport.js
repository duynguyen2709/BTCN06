const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {

        return UserModel.getUser(username)
            .then(user => {
                if (!user) {
                    return cb(null, false, {
                        message: 'Không tìm thấy người dùng ' + username
                    });
                }

                bcrypt.compare(password, user.password).then((res) => {
                    if (!res) {
                        return cb(null, false, {
                            message: 'Sai mật khẩu'
                        });
                    }
                    return cb(null, user, {
                        message: 'Đăng nhập thành công'
                    });
                });

            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '1612145'
    },
    function (jwtPayload, next) {
        next(null, jwtPayload.username);
    }
));