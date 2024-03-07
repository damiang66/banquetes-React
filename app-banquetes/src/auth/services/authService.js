import axios from "axios";

export const loginUser = async ({username, password}) => {
    try {
        console.log(username);
        return await axios.post('http://localhost:8080/login', {
           
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
}