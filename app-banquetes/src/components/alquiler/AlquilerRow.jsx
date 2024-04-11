import React, { useEffect, useState } from 'react'
import { useAlquiler } from '../../hooks/useAlquiler';
import { useAuth } from '../../auth/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { AlquileresVerProducto } from './AlquileresVerProducto';

export const AlquilerRow = ({id, cliente, usuario, direccion, productos, precioTotal, fecha,estado,cantidad}) => {
  const { handlerAlquilerSelectedForm, handlerRemoveAlquiler,abrirModalProductos,visibleProducto} = useAlquiler();
  const navegate = useNavigate()
  const { login } = useAuth();
 const [isModalOpen,setIsModalOpen]=useState(false);
 const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};
return (
  <>
 
 <AlquileresVerProducto isOpen={isModalOpen} onClose={closeModal} productos={productos} cantidad={cantidad} />
  <tr>
  <td>{id}</td>
  <td>{cliente?.nombre}</td> 
  <td>{usuario?.nombre}</td>
  <td>{direccion}</td>
  <td><>
  <button onClick={openModal} className='btn btn-success btn-sm'>ver</button>
  </></td>
  <td>{precioTotal}</td>
  <td>{fecha}</td>
  <td>{estado}</td>
  <td>{cantidad}</td>
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
</>
)
}
