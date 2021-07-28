'use strict';
const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/register', authCtrl.registerUser);

module.exports = router;
