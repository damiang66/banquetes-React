import { useEffect, useState } from "react";
import Usuario from "../modelo/Usuario";
import { UsuarioFindAll } from "../service/UsuarioService";


export const UsuarioLista = () => {
    const [usuarios, setusuarios] = useState<Usuario[]>();
    useEffect(()=>{
getUsuarios();
    },[])
    const getUsuarios = async ()=>{
        try {
            const respuestas:any = await UsuarioFindAll();
           
           
            setusuarios(respuestas?.data)
          
            
        } catch (error) {
            console.log(error);
            
        }
       
    }
  return (
    <>
    <div>UsuarioLista</div>
    {console.log(usuarios)
    }
    </>
    

  )
}
