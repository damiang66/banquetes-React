import React, { useEffect, useState } from 'react'
import { useProducto } from '../../hooks/useProducto';
import { NavLink } from 'react-router-dom';

export const ProductoForm = ({producto}) => {
    const {  handlerAddProductos, errors } = useProducto();
    const [productoForm, setProductoForm] = useState({})
    useEffect(() => {
      if(producto){
        setProductoForm(producto)
      }else{
        setProductoForm(...productoForm,
          id=0)
      }
     
    }, [producto])
    const onInputChange = ({ target }) => {
      // console.log(target.value)
      const { name, value } = target;
      setProductoForm({
          ...productoForm,
          [name]: value,
      })
  }
    const onSubmit = (event)=>{
      event.preventDefault();
      handlerAddProductos(productoForm);
    }
    
    return (
     
      <div>
          <form onSubmit={ onSubmit }>
              <input
                  className="form-control my-3 w-75"
                  placeholder="nombre"
                  name="nombre"
                  value={ productoForm?.nombre}
                  onChange={onInputChange} />
              <p className="text-danger">{ errors?.nombre}</p>
              <input
                  className="form-control my-3 w-75"
                  placeholder="cantidad"
                  name="cantidad"
                  value={ productoForm?.cantidad}
                  onChange={onInputChange} />
          
             
              <input
                  className="form-control my-3 w-75"
                  placeholder="cantidad_minima"
                  name="cantidad_minima"
                  value={ productoForm?.cantidad_minima}
                  onChange={onInputChange} />
             
              <input
                  className="form-control my-3 w-75"
                  placeholder="cantidad en Alguiler"
                  name="cantidadEnAlquiler"
                  value={ productoForm?.cantidadEnAlquiler}
                  onChange={onInputChange} />
             
              <input
                  className="form-control my-3 w-75"
                  placeholder="categoria"
                  name="categoria"
                  value={ productoForm?.categoria?.nombre}
                  onChange={onInputChange} />
              <p className="text-danger">{ errors?.productoForm?.categoria?.nombre}</p>
              <input type="hidden"
                  name="id"
                  value={productoForm?.id} />
              
              <button
                  className="btn btn-primary"
                  type="submit">
                  {producto?.id > 0 ? 'Editar' : 'Crear'}
              </button>
  
             <NavLink
                  className="btn btn-primary mx-2"
                  type="button"
                 to={'/productos/lista'}>
                  Cerrar
              </NavLink>
              
          </form>
        </div>
    )
}
