let url = "http://localhost:4000";
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
};

module.exports = userService;