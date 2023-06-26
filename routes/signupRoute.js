const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const authRouter = express.Router();

authRouter.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

module.exports = authRouter;