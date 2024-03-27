import axios from "axios";

const url = 'http://localhost:8080/productos'

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const ProductoFindAll = async ()=>{
    try {
        return await axios.get(url,config());
    } catch (error) {
        throw error;
    }

}
export const ProductoFindById = async (id)=>{
    try {
        return await axios.get(`${url}/${id}`,config())
    } catch (error) {
        throw error;
    }
}
export const ProductoSave = async(producto)=>{
    console.log("Desde el Servicio de producto " + JSON.stringify(producto));
   try {
    return await axios.post(url,producto,config());
    
   } catch (error) {
    throw error;
   }
   
}
export const ProductoUpdate = async (producto)=>{
   // producto.categoria = +producto.categoria
    try {
        return await axios.put(`${url}/${producto.id}`,producto,config())
    } catch (error) {
       throw error; 
    }
}
export const ProductoDelete = async(id)=>{
    try {
        return await axios.delete(`${url}/${id}`,config()) 
    } catch (error) {
        throw error;
    }
}
export const CategoriaFindAll = async()=>{
    try {
        return await axios.get(`${url}/categoria`)
    } catch (error) {
        throw error;
    }
}
export const ProductoBuscar = async (termino)=>{
    try {
      console.log(termino);
      return await axios.get(`${url}/buscar/${termino}`,config())  
    } catch (error) {
       // throw error;
    }
}