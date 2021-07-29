'use strict';
const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');

router.get('/list-users', userCtrl.listUsers);

router.get('/find-user/:userId', userCtrl.findUser);

router.put('/update-user/:userId', userCtrl.updateUser);

router.delete('/delete-user/:userId', userCtrl.deleteUser);

module.exports = router;
