import React from 'react'
import { useProducto } from '../../hooks/useProducto';
import { useAuth } from '../../auth/hooks/useAuth';
import { NavLink } from 'react-router-dom';

export const ProductoRow = ({id, nombre, cantiadad, cantidad_minima, cantidadEnAlquiler, categoria}) => {
    const { handlerProductoSelectedForm, handlerRemoveProductos } = useProducto();
    const { login } = useAuth();
  return (
    <tr>
    <td>{id}</td>
    <td>{nombre}</td>
    <td>{cantiadad}</td>
    <td>{cantidad_minima}</td>
    <td>{cantidadEnAlquiler}</td>
    <td>{categoria}</td>
    {!login.isAdmin ||
        <>
            
            <td>
                <NavLink className={'btn btn-secondary btn-sm'}
                    to={'/productos/form/' + id} >
                    Editar
                </NavLink>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handlerRemoveProductos(id)}
                >
                   Eliminar
                </button>
            </td>
        </>
    }
</tr>
  )
}
