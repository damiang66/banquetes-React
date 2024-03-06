import axios from "axios";

const url = 'http://localhost:8080/'
export const UsuarioFindAll = async()=>{
    try {
        const respuesta = await axios.get(url);
        return respuesta;
        
    } catch (error) {
        return error;
    }

}