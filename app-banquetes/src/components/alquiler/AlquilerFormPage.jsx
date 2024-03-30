import React, { useEffect, useState } from 'react'
import { useAlquiler } from '../../hooks/useAlquiler';
import { useParams } from 'react-router-dom';
import { AlquilerForm } from './AlquilerForm';

export const AlquilerFormPage = () => {
  const[titulo,setTitulo]=useState('')
  const {alquileres=[],getAlquileres}= useAlquiler();
  const [alquilerSeleccionado={},setAlquilerSeleccionado]=useState({});
  const {id}=useParams()
  useEffect(()=>{
    getAlquileres()
console.log(id);
  if(id){
    setTitulo( 'Editar Alquiler')
    const alquiler = alquileres.find(u => u.id == id)
    setAlquilerSeleccionado(alquiler);
  }else{
   setTitulo('Registrar Alquiler')
  }
  },[])
  return (
    <div className="container my-4">
    <h4>{titulo}</h4>
    <div className="row">
        <div className="col">
            <AlquilerForm alquiler={alquilerSeleccionado} />
        </div>
    </div>
</div>
  )
}
