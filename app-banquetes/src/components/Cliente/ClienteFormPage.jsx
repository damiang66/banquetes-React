import React, { useEffect, useState } from 'react'
import { useClientes } from '../../hooks/useClientes'
import { useParams } from 'react-router-dom';
import { ClienteForm } from './ClienteForm';

export const ClienteFormPage = () => {
  const[titulo,setTitulo]=useState('')
  const {clientes=[],getClientes}= useClientes();
  const [clienteSeleccionado,setClienteSeleccionado]=useState({});
  const {id}=useParams()
  useEffect(()=>{
    getClientes()
console.log(id);
  if(id){
    setTitulo( 'Editar Cliente')
    const cliente = clientes.find(u => u.id == id)
    setClienteSeleccionado(cliente);
  }else{
   setTitulo('Registro de Cliente')
  }
  },[])
  return (
    <div className="container my-4">
    <h4>{titulo}</h4>
    <div className="row">
        <div className="col">
            <ClienteForm cliente={clienteSeleccionado} />
        </div>
    </div>
</div>
  )
}
