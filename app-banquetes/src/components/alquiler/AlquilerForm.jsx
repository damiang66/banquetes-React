import React, { useEffect, useState } from 'react'
import { useAlquiler } from '../../hooks/useAlquiler';
import { NavLink } from 'react-router-dom';

export const AlquilerForm = ({alquiler}) => {
  console.log(alquiler);
  const {  handlerAddAlquiler, errors } = useAlquiler();
  const [alquilerForm, setAlquilerForm] = useState({})
  useEffect(() => {
    if(alquiler){
      setAlquilerForm(alquiler)
    }else{
      setAlquilerForm(...alquilerForm,
        id=0)
    }
   
  }, [alquiler])
  const onInputChange = ({ target }) => {
    // console.log(target.value)
    const { name, value } = target;
    setAlquilerForm({
        ...alquilerForm,
        [name]: value,
    })
}
  const onSubmit = (event)=>{
    event.preventDefault();
    handlerAddAlquiler(alquilerForm);
  }
  
  return (
   
    <div>
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 w-75"
                placeholder="nombre"
                name="nombre"
                value={ alquilerForm?.cliente?.nombre}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.cliente?.nombre}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="apellido"
                name="apellido"
                value={ alquilerForm?.direccion}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.direccion}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="apellido"
                type='date'
                name="apellido"
                value={ alquilerForm?.fecha}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.fecha}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="email"
                name="email"
                value={ alquilerForm?.productos}
                onChange={onInputChange} />
        
            <input
                className="form-control my-3 w-75"
                placeholder="telefono"
                name="telefono"
                value={ alquilerForm?.cantidad}
                onChange={onInputChange} />
        
            <input
                className="form-control my-3 w-75"
                placeholder="direccion"
                name="direccion"
                value={ alquilerForm?.precio}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.precio}</p>
            <input type="hidden"
                name="id"
                value={alquilerForm?.id} />
            
            <button
                className="btn btn-primary"
                type="submit">
                {alquiler?.id > 0 ? 'Editar' : 'Crear'}
            </button>

           <NavLink
                className="btn btn-primary mx-2"
                type="button"
               to={'/alquileres/lista'}>
                Cerrar
            </NavLink>
            
        </form>
      </div>
  )
}
