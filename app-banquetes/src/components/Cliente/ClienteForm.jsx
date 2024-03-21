import React, { useEffect, useState } from 'react'
import { useClientes } from '../../hooks/useClientes';
import { NavLink } from 'react-router-dom';

export const ClienteForm = ({cliente}) => {
  const {  handlerAddCliente, errors } = useClientes();
  const [clienteForm, setclienteForm] = useState({})
  useEffect(() => {
    if(cliente){
      setclienteForm(cliente)
    }else{
      setclienteForm(...clienteForm,
        id=0)
    }
   
  }, [cliente])
  const onInputChange = ({ target }) => {
    // console.log(target.value)
    const { name, value } = target;
    setclienteForm({
        ...clienteForm,
        [name]: value,
    })
}
  const onSubmit = (event)=>{
    event.preventDefault();
    handlerAddCliente(clienteForm);
  }
  
  return (
   
    <div>
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 w-75"
                placeholder="nombre"
                name="nombre"
                value={ clienteForm?.nombre}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.nombre}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="apellido"
                name="apellido"
                value={ clienteForm.apellido}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.apellido}</p>
           
            <input
                className="form-control my-3 w-75"
                placeholder="email"
                name="email"
                value={ clienteForm.email}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.email}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="telefono"
                name="telefono"
                value={ clienteForm.telefono}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.telefono}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="direccion"
                name="direccion"
                value={ clienteForm.direccion}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.direccion}</p>
            <input type="hidden"
                name="id"
                value={clienteForm.id} />
            
            <button
                className="btn btn-primary"
                type="submit">
                {cliente?.id > 0 ? 'Editar' : 'Crear'}
            </button>

           <NavLink
                className="btn btn-primary mx-2"
                type="button"
               to={'/clientes/lista'}>
                Cerrar
            </NavLink>
            
        </form>
      </div>
  )
}
