import axios from "axios"

const url = 'http://localhost:8080/alquileres'
const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const AlquilerFindAll=async ()=>{
try {
    return await axios.get(url,config());
    
} catch (error) {
    throw error;
}
}
export const AlquilerFindById = async (id)=>{
    try {
        return axios.get(`${url}/${id}`,config())
    } catch (error) {
        throw error;
    }
}
export const AlquilerSave=async(alquiler)=>{
    try {
        return axios.post(url,alquiler,config())
    } catch (error) {
        throw error;
    }
}
export const AlquilerUpdate = async (alquiler)=>{
    try {
        return axios.put(`${url}/${id}`,alquiler,config());
    } catch (error) {
        throw error;
    }
}
export const AlquilerDelete= async(id)=>{
    try {
        return axios.delete(`${url}/${id}`,config())
    } catch (error) {
        throw error;
    }
}