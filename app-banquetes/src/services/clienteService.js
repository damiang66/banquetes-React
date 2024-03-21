import axios from "axios"
const url = 'http://localhost:8080/clientes'
const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const clienteFindAll= async()=>{
    try {
        return await axios.get(url,config());
    } catch (error) {
        
    }
}
export const clienteSave = async(cliente)=>{
    try {
        return await axios.post(`${url}`,cliente,config())
    } catch (error) {
        return error;
    }
}
export const clienteFindById = async(id)=>{
    try {
        return await axios.get(`${url}/${id}`,config())
    } catch (error) {
        return error;
    }
}
export const clienteUpdate = async (cliente)=>{
    try {
        return await axios.put(`${url}/${cliente.id}`,cliente,config())
    } catch (error) {
        return error;
    }

}
export const clienteDelete = async(id)=>{
    try {
        return await axios.delete(`${url}/${id}`,config())
    } catch (error) {
        return error;
    }
}