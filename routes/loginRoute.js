const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const loginRouter = express.Router();

loginRouter.get('/', async function (req, res) {
    return res.sendFile(path.join(__dirname, '../views/login.html'));
});

loginRouter.post('/', async function (req, res) {
    const result = await userService.login(req.body);
    if(result.error){
        const error = result.error;
        return res.status(401).json({ error });
    }else{
        const token = result.token;
        req.session.token = token;
        const verifiedToken = await userService.verifyToken(token); 
        if(verifiedToken.error){
            const error = verifiedToken.error;
            return res.status(401).json({error});
        }else{
            return res.status(200).json({token});
        }
    }
});

module.exports = loginRouter;