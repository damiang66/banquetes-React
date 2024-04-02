import React, { useEffect, useState } from 'react';
import { useAlquiler } from '../../hooks/useAlquiler';
import { NavLink } from 'react-router-dom';

export const AlquilerForm = ({ alquiler }) => {
  const { handlerAddAlquiler, errors } = useAlquiler();
  const [alquilerForm, setAlquilerForm] = useState({
    clienteId: '',
    productos: [],
    cantidades: [],
    precios: [],
    descuento: 0,
    precioTotal: 0,
    fecha: '',
    alquilado: false,
    retirado: false
  });
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [productos, setProductos] = useState([]); // Lista de productos
  const [productoSeleccionado, setProductoSeleccionado] = useState(''); // Producto seleccionado
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(''); // Cantidad seleccionada

  useEffect(() => {
    // Simulación de datos de clientes y productos
    setClientes([{ id: 1, nombre: 'Cliente 1' }, { id: 2, nombre: 'Cliente 2' }]);
    setProductos([{ id: 1, nombre: 'Producto 1', precio: 10 }, { id: 2, nombre: 'Producto 2', precio: 15 }]);
  }, []);

  useEffect(() => {
    // Calcular el precio total al actualizar los precios de los productos
    const total = alquilerForm.precios.reduce((acc, precio) => acc + precio, 0);
    setAlquilerForm((prevForm) => ({ ...prevForm, precioTotal: total }));
  }, [alquilerForm.precios]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setAlquilerForm({
      ...alquilerForm,
      [name]: value
    });
  };

  const handleProductoChange = (event) => {
    setProductoSeleccionado(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidadSeleccionada(event.target.value);
  };

  const agregarProducto = () => {
    const producto = productos.find((p) => p.nombre === productoSeleccionado);
    if (producto) {
      setAlquilerForm((prevForm) => ({
        ...prevForm,
        productos: [...prevForm.productos, producto.nombre],
        cantidades: [...prevForm.cantidades, cantidadSeleccionada],
        precios: [...prevForm.precios, cantidadSeleccionada * producto.precio]
      }));
    }
    // Limpiar selección después de agregar el producto
    setProductoSeleccionado('');
    setCantidadSeleccionada('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handlerAddAlquiler(alquilerForm);
  };

  return (
    <div>
    

      <form onSubmit={onSubmit}>
        <label htmlFor="cliente">Cliente:</label>
        <input
          id="cliente"
          className="form-control my-3 w-75"
          type="text"
          name="clienteId"
          list="clientes"
          value={alquilerForm?.clienteId || ''}
          onChange={onInputChange}
        />
        <datalist id="clientes">
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.nombre} />
          ))}
        </datalist>

        <label htmlFor="fecha">Fecha:</label>
        <input
          id="fecha"
          className="form-control my-3 w-75"
          type="date"
          name="fecha"
          value={alquilerForm?.fecha || ''}
          onChange={onInputChange}
        />

     

        <div className="form-check">
          <input
            id="alquilado"
            className="form-check-input"
            type="checkbox"
            name="alquilado"
            checked={alquilerForm.alquilado}
            onChange={onInputChange}
          />
          <label className="form-check-label" htmlFor="alquilado">Alquilado</label>
        </div>

        <div className="form-check">
          <input
            id="retirado"
            className="form-check-input"
            type="checkbox"
            name="retirado"
            checked={alquilerForm.retirado}
            onChange={onInputChange}
          />
          <label className="form-check-label" htmlFor="retirado">Retirado</label>
        </div>

        <label htmlFor="productos">Producto:</label>
        <select
          id="productos"
          className="form-control my-3 w-75"
          name="producto"
          value={productoSeleccionado}
          onChange={handleProductoChange}
        >
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.nombre}>
              {producto.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="cantidad">Cantidad:</label>
        <input
          id="cantidad"
          className="form-control my-3 w-75"
          type="number"
          min="1"
          name="cantidad"
          value={cantidadSeleccionada}
          onChange={handleCantidadChange}
        />

        <button className="btn btn-primary" type="button" onClick={agregarProducto}>
          Agregar producto
        </button>
        <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {alquilerForm.productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto}</td>
              <td>{alquilerForm.cantidades[index]}</td>
              <td>${alquilerForm.precios[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label htmlFor="descuento">Descuento:</label>
        <input
          id="descuento"
          className="form-control my-3 w-75"
          type="number"
          min="0"
          step="0.01"
          name="descuento"
          value={alquilerForm?.descuento || ''}
          onChange={onInputChange}
        />

        <button className="btn btn-primary" type="submit">
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
  );
};
