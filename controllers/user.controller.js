'use strict';
const User = require('../models/user.model');

// list all users list
const listUsers = async (req, res, next) => {
    try {
        // find users
        let users = await User.find({});

        // send response
        return res.json({ status: 'success', data: users });
    } catch (ex) {
        res.status(400).json(ex.message);
    }
}

// find user by userId
const findUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        // find user
        let user = await User.findById(userId);

        // send response
        return res.json({ status: 'success', data: user });
    } catch (ex) {
        res.status(400).json(ex.message);
    }
}

module.exports = {
    listUsers,
    findUser
}
