'use strict';
const User = require('../models/user.model');

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
    registerUser
}
