const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const authRouter = express.Router();

authRouter.get('/GetUsername', async function (req, res) {
    try{
        const token = req.query.token;
        const verifiedToken = await userService.verifyToken(token); 
        if(verifiedToken.error){
            const error = verifiedToken.error;
            return res.status(401).json({error});
        }else{
            const username = verifiedToken.userName;
            return res.json(username);
        }
    }catch{
        return res.status(401).json({error: "Error getting username"});
    }
});

module.exports = authRouter;