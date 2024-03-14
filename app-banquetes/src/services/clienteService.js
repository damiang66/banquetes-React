import axios from "axios"
const url = 'http://localhost:8080/clientes'
export const clienteFindAll= async()=>{
    try {
        return await axios.get(url);
    } catch (error) {
        
    }
}