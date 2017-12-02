const passportJwt = require('passport-jwt');
const winston = require('winston');

const configuration = require('./../constants/configuration');
const User = require('./../models/user.model');

const jwtExtractor = passportJwt.ExtractJwt;
const jwtStrategy = passportJwt.Strategy;

const opts = {};
opts.jwtFromRequest = jwtExtractor.fromAuthHeaderAsBearerToken();
opts.secretOrKey = configuration.hashSecret;

const strategy = new jwtStrategy(opts, function(jwt_payload, done) {
    winston.debug(` JWT Stragegy retrieved token ${JSON.stringify(jwt_payload)}`);
    User.findOne({
        id: jwt_payload.id
    }, function(err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

module.exports = strategy;