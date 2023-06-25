const express = require('express');
const path = require('path');
const gameRouter = express.Router();

gameRouter.get('/', async function (req, res) {

    const token = req.session.token;
    console.log(token)

    // TODO: Check auth with token

    // if auth succeeds:
    res.sendFile(path.join(__dirname, '../views/home.html'));
    
    // // if auth fails: 
    // res.redirect('Login')
});

module.exports = gameRouter;