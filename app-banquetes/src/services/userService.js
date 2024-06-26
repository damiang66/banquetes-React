import axios from "axios"

const BASE_URL = 'http://localhost:8080/usuarios';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

export const findAll = async() => {
    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}
export const UsuarioNombre = async(nombre)=>{
    try {
        return await axios.get(`${BASE_URL}/nombre/${nombre}`)
    } catch (error) {
        
    }
}
export const save = async ({ username, email, password, admin }) => {
    try {
        console.log(admin);
        return await axios.post(BASE_URL, {
            username,
            email,
            password,
            admin,
        }, config());
    } catch (error) {
        throw error;
    }
}

export const update = async({ id, username, email, admin }) => {
    console.log(admin);
    try {
        return await axios.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
        }, config());
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, config());
    } catch (error) {
        throw error;
    }
}