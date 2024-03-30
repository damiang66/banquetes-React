import React, { useState } from 'react'
import { useAlquiler } from '../../hooks/useAlquiler';
import { useAuth } from '../../auth/hooks/useAuth';
import {AlquilerRow} from '../alquiler/AlquilerRow'

export const AlquilerList = () => {
  const { alquileres } = useAlquiler();
  const [alquileresb, setAlquileresb] = useState([]);
  const [nombre, setNombre] = useState('');
  const { login } = useAuth();

  useEffect(() => {
      setAlquileresb(alquileres);
  }, [alquileres]);

  const buscar = async () => {
    /*
      try {
          const respuesta = await ClienteBuscar(nombre);
          setClientesb(respuesta.data);
      } catch (error) {
          console.error('Error al buscar clientes:', error);
          // Manejar el error si es necesario
      }
      */
  };
    const onInputChange = (event) => {
      const { value } = event.target;
      setNombre(value);
      /*
      if (value === '') {
          restablecer();
      } else {
          buscar();
      }
      */
  };
  

  const restablecer = () => {
      setNombre('');
      setAlquileresb(alquileres);
  };



  return (
      <>
          <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                  <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                      <input name="buscar" value={nombre} onChange={onInputChange} className="form-control me-2" placeholder="Buscar" />
                      <button onClick={restablecer} className="btn btn-outline-success" type="button">Restablecer</button>
                  </form>
              </div>
          </nav>
          <table className="table table-hover table-striped">
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Cliente</th>
                      <th>Usuario</th>
                      <th>Direccion</th>
                      <th>productos</th>
                      <th>precio Total</th>
                      <th>Fecha</th>
                      <th>Alquilado</th>
                      <th>Retirado</th>
                      {!login.isAdmin || (
                          <>
                              <th>Editar</th>
                              <th>Eliminar</th>
                          </>
                      )}
                  </tr>
              </thead>
              <tbody>
                  {alquileresb.map(({ id, cliente, usuario, direccion, producto, precioTotal, fecha,alquilado,retirado }) => (
                      <AlquilerRow 
                          key={id}
                          id={id}
                          cliente={cliente}
                          usuario={usuario}
                          direccion={direccion}
                          producto={producto}
                          precioTotal={precioTotal}
                          fecha={fecha}
                          alquilado={alquilado}
                          retirado={retirado}
                         
                      />
                  ))}
              </tbody>
          </table>
      </>
  );
}
