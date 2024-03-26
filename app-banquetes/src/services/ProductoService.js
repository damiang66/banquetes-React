import axios from "axios";

const url = 'http//localhost:8080/productos'
export const ProductoFindAll = async ()=>{
    try {
        return await axios.get(url);
    } catch (error) {
        throw error;
    }

}
export const ProductoFindById = async (id)=>{
    try {
        return await axios.get(`${url}/${id}`)
    } catch (error) {
        throw error;
    }
}
export const ProductoSave = async(producto)=>{
   try {
    return await axios.post(url,producto);
    
   } catch (error) {
    throw error;
   }
   
}
export const ProductoUpdate = async (producto)=>{
    try {
        return await axios.put(`${url}/${producto.id}`,producto)
    } catch (error) {
       throw error; 
    }
}
export const ProductoDelete = async(id)=>{
    try {
        return await axios.delete(`${url}/${id}`) 
    } catch (error) {
        throw error;
    }
}