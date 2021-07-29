'use strict';
const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/list-users', userCtrl.listUsers);

router.get('/find-user/:userId', userCtrl.findUser);

router.put('/update-user/:userId', userCtrl.userById, userCtrl.updateUser);

router.delete('/delete-user/:userId', userCtrl.userById, userCtrl.deleteUser);

module.exports = router;
