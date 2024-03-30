import React from 'react'
import { useAlquiler } from '../../hooks/useAlquiler';
import { useAuth } from '../../auth/hooks/useAuth';

export const AlquilerRow = ({id, cliente, usuario, direccion, producto, precioTotal, fecha,alquilado,retirado}) => {
  const { handlerAlquilerSelectedForm, handlerRemoveAlquiler } = useAlquiler();
  const { login } = useAuth();
return (
  <tr>
  <td>{id}</td>
  <td>{cliente?.nombre}</td>
  <td>{usuario?.nombre}</td>
  <td>{direccion}</td>
  <td>{producto}</td>
  <td>{precioTotal}</td>
  <td>{fecha}</td>
  <td>{alquilado}</td>
  <td>{retirado}</td>
  {!login.isAdmin ||
      <>
          
          <td>
              <NavLink className={'btn btn-secondary btn-sm'}
                  to={'/alquileres/form/' + id} >
                  Editar
              </NavLink>
          </td>
          <td>
              <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handlerRemoveAlquiler(id)}
              >
                 Eliminar
              </button>
          </td>
      </>
  }
</tr>
)
}
