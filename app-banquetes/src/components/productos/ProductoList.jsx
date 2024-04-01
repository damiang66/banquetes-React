import React, { useEffect, useState } from 'react'
import { useProducto } from '../../hooks/useProducto';
import { useAuth } from '../../auth/hooks/useAuth';
import { ProductoRow } from './ProductoRow';
import { ProductoBuscar } from '../../services/ProductoService';

export const ProductoList = ({productoParam}) => {
  const { productos } = useProducto();
  const [productosb, setProductosb] = useState([]);
  const [nombre, setNombre] = useState('');
  const { login } = useAuth();

  useEffect(() => {
      setProductosb(productos);
  }, [productos]);

  const buscar = async () => {
    try {
        const respuesta = await ProductoBuscar(nombre);
        if (respuesta && respuesta.data) {
            setProductosb(respuesta.data);
        } else {
            // Manejar el caso donde respuesta.data es undefined
            console.error('La respuesta no contiene datos:', respuesta);
        }
    } catch (error) {
        console.error('Error al buscar productos:', error);
        // Manejar el error si es necesario
    }
};

  const restablecer = () => {
      setNombre('');
      setProductosb(productos);
  };

  const onInputChange = (event) => {
      const { value } = event.target;
      console.log(value);
      setNombre(value);
      if (value === '') {
          restablecer();
      } else {
          buscar();
      }
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
                      <th>Nombre</th>
                      <th>cantiadad</th>
                      <th>cantidad_minima</th>
                      <th>cantidadEnAlquiler</th>
                      <th>categoria</th>
                      {!login.isAdmin || (
                          <>
                              <th>Editar</th>
                              <th>Eliminar</th>
                          </>
                      )}
                  </tr>
              </thead>
              <tbody>
                  {productosb.map(({ id, nombre, cantiadad, cantidad_minima, cantidadEnAlquiler, categoria }) => (
                      <ProductoRow
                          key={id}
                          id={id}
                          nombre={nombre}
                          cantiadad={cantiadad}
                          cantidad_minima={cantidad_minima}
                          cantidadEnAlquiler={cantidadEnAlquiler}
                          categoria={categoria?.nombre}
                      />
                  ))}
              </tbody>
          </table>
      </>
  );
}
