const express = require('express');
const path = require('path');

const authRouter = express.Router();

authRouter.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

module.exports = authRouter;