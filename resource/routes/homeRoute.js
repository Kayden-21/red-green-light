const express = require('express');
const path = require('path');
const gameRouter = express.Router();

gameRouter.get('/', async function (req, res) {
    // if auth succeeds:
    res.sendFile(path.join(__dirname, '../views/home.html'));
    
    // // if auth fails: 
    // res.redirect('Login')
});

module.exports = gameRouter;