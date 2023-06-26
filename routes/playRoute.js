const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const gameRouter = express.Router();

gameRouter.get('/', async function (req, res) {
    const verifiedToken = await userService.verifyToken(req.session.token); 
    if(verifiedToken.error){
        // const error = verifiedToken.error;
        // return res.redirect(401, '/Login'); // gives cool error but meh ux
        return res.redirect('/Login');
    }else{
        return res.sendFile(path.join(__dirname, '../views/play.html'));
    }
});

module.exports = gameRouter;