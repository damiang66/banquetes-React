import React from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { NavLink } from 'react-router-dom';


export const ClienteRow = ({ id, nombre, apellido, email,telefono,direccion }) => {
    const { handlerClienteSelectedForm, handlerRemoveClientes } = useClientes();
    const { login } = useAuth();
  return (
    <tr>
    <td>{id}</td>
    <td>{nombre}</td>
    <td>{apellido}</td>
    <td>{email}</td>
    <td>{telefono}</td>
    <td>{direccion}</td>
    {!login.isAdmin ||
        <>
            <td>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handlerClienteSelectedForm({
                        id,
                        nombre, apellido, email,telefono,direccion
                    })}
                >
                    update
                </button>
            </td>
            <td>
                <NavLink className={'btn btn-secondary btn-sm'}
                    to={'/users/edit/' + id} >
                    update route
                </NavLink>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handlerRemoveClientes(id)}
                >
                    remove
                </button>
            </td>
        </>
    }
</tr>
  )
}
