let url = "http://localhost:4000";
export const userService = {
    login: async ({username, password}) => {
        const toSend = {
            username,
            password
        }
        const body = JSON.stringify(toSend);
        const result = await fetch(
            url + '/login', 
            {
                method: "POST",
                body
            }
        );
        return result
    },
    signup: async ({username, password}) => {
        const toSend = {
            username,
            password
        }
        const body = JSON.stringify(toSend);
        const result = await fetch(
            url + '/register', 
            {
                method: "POST",
                body
            }
        );
        return result
    },

}