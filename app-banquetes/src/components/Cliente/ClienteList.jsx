import React, { useEffect, useState } from 'react'
import { clienteFindAll } from '../../services/clienteService'

export const ClienteList = () => {
    const [clientes, setClientes] = useState([])
   useEffect(() => {
    traerCliente()
   
     
   }, [])
   
    const traerCliente = async ()=>{
        const respuesta = await clienteFindAll()
        console.log(respuesta);
        setClientes(respuesta.data);
    }
  return (
  <>
  {console.log(clientes)}
  </>
  )
}
