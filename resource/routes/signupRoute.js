const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const signupRoute = express.Router();

signupRoute.get('/', async function (req, res) {
    return res.sendFile(path.join(__dirname, '../views/signup.html'));
});

signupRoute.post('/', async function (req, res) {
    const result = await userService.signup(req.body);
    if(result.error){
        const error = result.error;
        return res.status(401).json({error});
    }else{
        const message = result.message;
        return res.status(200).json(message);
    }
});

module.exports = signupRoute;