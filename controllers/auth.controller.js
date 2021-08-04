'use strict';
const User = require('../models/user.model');
const { matchPassword } = require('../helpers/password.helper');

/**
 * Login user 
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let message = 'Inavlid email and password';
        // match email
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ status: 'failed', data: { message } });
        }

        // match password
        let isMatched = await matchPassword(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ status: 'failed', data: { message } });
        }
        user.password = undefined;

        // generate token
        let token = user.generateToken();

        // send response
        return res.json({ status: 'success', data: user, token });
    } catch (ex) {
        res.status(400).json(ex);
    }
}

/**
 * Register new user
 */
const registerUser = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        // save user details
        let user = await User.create({
            name,
            email,
            phone,
            password
        });

        user.password = undefined;

        // send response
        return res.status(201).json({ status: 'success', data: user });
    } catch (ex) {
        res.status(400).json(ex);
    }
}

module.exports = {
    registerUser,
    loginUser
}
