const express = require('express');
const jwt = require('jwt-simple');
const winston = require('winston');

const configuration = require('./../constants/configuration');
const User = require('./../models/user.model');

class AuthController {

    // TODO: Either use JWT or a MongoDB document to track JWT expiry times and force renewals :)

    get router() {
        return this._router;
    }

    constructor() {
        this.init();
    }

    init() {
        this._router = express.Router();
        this._router.post('/login', this.login.bind(this));
    }

    login(request, response) {

        const username = request.body.username;
        const password = request.body.password;

        winston.debug(` Logging in as ${username} `);

        User.findOne({ username: username }, (error, user) => {
            if (error) {
                const errorBody = {
                    code: 'TM-AUTH-001',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.status(401).json(errorBody);
            } else if (!user) {
                winston.error('Invalid user or password.');
                response.status(401).json({ error: 'Invalid user or password.' });
            } else {
                user.comparePassword(password, function(err, matches) {
                    if (matches && !err) {
                        const token = jwt.encode(user, configuration.hashSecret);
                        response.json({ token: token });
                    } else {
                        winston.error('Invalid user or password.');
                        response.status(401).json({ error: 'Invalid user or password.' });
                    }
                });
            }
        });

    }

}

module.exports = new AuthController();
