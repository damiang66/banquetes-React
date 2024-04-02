import React, { useEffect, useState } from 'react';
import { useAlquiler } from '../../hooks/useAlquiler';
import { NavLink } from 'react-router-dom';

export const AlquilerForm = ({ alquiler }) => {
  const { handlerAddAlquiler, errors } = useAlquiler();
  const [alquilerForm, setAlquilerForm] = useState({
    clienteId: '',
    productos: [],
    cantidad: [],
    descuento: 0,
    precioTotal: 0,
    fecha: '',
    alquilado: false,
    retirado: false
  });
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [productos, setProductos] = useState([]); // Lista de productos

  useEffect(() => {
    // Simulación de datos de clientes y productos
    setClientes([{ id: 1, nombre: 'Cliente 1' }, { id: 2, nombre: 'Cliente 2' }]);
    setProductos([{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }]);
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setAlquilerForm({
      ...alquilerForm,
      [name]: value
    });
  };

  const handleProductoChange = (event) => {
    const { value } = event.target;
    setAlquilerForm({
      ...alquilerForm,
      productos: [...alquilerForm.productos, value]
    });
  };

  const handleCantidadChange = (index, event) => {
    const { value } = event.target;
    const newCantidad = [...alquilerForm.cantidad];
    newCantidad[index] = value;
    setAlquilerForm({
      ...alquilerForm,
      cantidad: newCantidad
    });
  };

  const handleAgregarProducto = () => {
    setAlquilerForm({
      ...alquilerForm,
      cantidad: [...alquilerForm.cantidad, '']
    });
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

        <label htmlFor="productos">Productos:</label>
        <select
          id="productos"
          className="form-control my-3 w-75"
          name="productos"
          onChange={handleProductoChange}
        >
          <option value="">Selecciona un producto...</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.nombre}>
              {producto.nombre}
            </option>
          ))}
        </select>

        {alquilerForm.productos.map((producto, index) => (
          <div key={index}>
            <label htmlFor={`cantidad-${index}`}>Cantidad de {producto}:</label>
            <input
              id={`cantidad-${index}`}
              className="form-control my-3 w-75"
              type="number"
              min="1"
              name={`cantidad-${index}`}
              value={alquilerForm?.cantidad[index] || ''}
              onChange={(e) => handleCantidadChange(index, e)}
            />
          </div>
        ))}

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAgregarProducto}
        >
          Agregar Producto
        </button>

        <button className="btn btn-primary" type="submit">
          {alquiler?.id > 0 ? 'Editar' : 'Crear'}
        </button>

        <NavLink
          className="btn btn-primary mx-2"
          type="button"
          to={'/alquileres/lista'}
        >
          Cerrar
        </NavLink>
      </form>
    </div>
  );
};
