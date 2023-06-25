const express = require('express');
const path = require('path');
const userService = require('../services/userServices');

const loginRoute = express.Router();

loginRoute.get('/', function (req, res) {
    // check if VALID logged in -> go to home
    // if not -> 
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

loginRoute.post('/', async function (req, res) {

    const result = await userService.login(req.body);
    
    if(result.error){
        const error = result.error;
        return res.status(401).json({ error });
    }else{
        const token = await userService.verifyToken(result.token); 
        if(token.error){
            const error = token.error;
            return res.status(401).json({error});
        }else{
            return res.status(200).json({token});
        }
    }
});


module.exports = loginRoute;