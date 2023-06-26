const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').config({path: '../.env'});


const userService = {
    login: async ({username, password}) => {
        const result = await fetch(
            url + '/login', 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            }
        );
        return await result.json();
    },
    signup: async ({username, password}) => {
        const result = await fetch(
            url + '/register', 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            }
        );
        return await result.json();
    },
    verifyToken: async (token) => {
        try{
            const decoded = jwt.verify(token, process.env.JWT);
            return decoded; 
        }catch(error){
            return {error};
        }
    },
};

module.exports = userService;