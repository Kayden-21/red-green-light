const express = require('express');
const path = require('path');
const userService = require('../services/userServices');
const jwt = require('jsonwebtoken');

const loginRoute = express.Router();

loginRoute.get('/', function (req, res) {
    // check if VALID logged in -> go to home
    // if not -> 
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

loginRoute.post('/', async function (req, res) {

    const result = await userService.login(req.body);
    console.log("TOKEN: ", result.token);
    if(result.error){
        console.error(result.error);
        res.redirect('Login');
    }else{
        try{
            const decoded = jwt.verify(result.token, "6b9d56e33e9428a65a669bde925193d588b2657c");
            req.session.token = result.token;
            res.redirect('Home');
        }catch(error){
            // redirect to 401 unauthorised page
            // 403 -> forbidden (not enough privileges)
            console.error("NON VALID JWT TOKEN STUFF");
            res.redirect('Login');
        }

    }
});


module.exports = loginRoute;