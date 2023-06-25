let url = "http://localhost:4000";
const jwt = require('jsonwebtoken');

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
            const decoded = jwt.verify(token, "6b9d56e33e9428a65a669bde925193d588b2657c");
            return decoded; 
        }catch(error){
            return error;
        }
    },
};

module.exports = userService;