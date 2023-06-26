const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const homeRouter = express.Router();

homeRouter.get('/', async function (req, res) {
    const verifiedToken = await userService.verifyToken(req.session.token); 
    if(verifiedToken.error){
        // return res.redirect(401, '/Login'); // gives cool error but meh ux
        return res.redirect('/Login');
    }else{
        return res.sendFile(path.join(__dirname, '../views/home.html'));
    }
});

homeRouter.post('/', async function (req, res) {
    const sessionToken = req.body;
    if(sessionToken != null){
        const token = await userService.verifyToken((sessionToken).token); 
        if(token.error){
            // return res.redirect(401, '/Login'); // gives cool error but meh ux
            return res.redirect('/Login');
        }else{
            return res.redirect('/Home');
        }
    }else{
        // return res.redirect(401, '/Login'); // gives cool error but meh ux
        return res.redirect('/Login');
    }
});

module.exports = homeRouter;