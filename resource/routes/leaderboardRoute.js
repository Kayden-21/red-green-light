const express = require('express');
const path = require('path');

const leaderboardRouter = express.Router();

leaderboardRouter.get('/', async function (req, res) {
    // if auth succeeds:
    res.sendFile(path.join(__dirname, '../views/leaderboard.html'));

    // // if auth fails: 
    // res.redirect('Login')
});

module.exports = leaderboardRouter;