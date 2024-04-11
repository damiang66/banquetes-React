import React, { useEffect, useState } from 'react';
import { useAlquiler } from '../../hooks/useAlquiler';
import { NavLink } from 'react-router-dom';
import { useClientes } from '../../hooks/useClientes';
import { useProducto } from '../../hooks/useProducto';
import { useUsers } from '../../hooks/useUsers';
import { UsuarioNombre, findAll } from '../../services/userService';
import {  useSelector } from "react-redux";

export const AlquilerForm = ({ alquiler }) => {
  const {user}= useSelector(state=>state.auth)
  const { handlerAddAlquiler, errors } = useAlquiler();
 
  const [usuario,setUsuario]=useState([])


  const [alquilerForm, setAlquilerForm] = useState({
    cliente: {},
    productos: [],
    usuario:{},
    direccion:'',
    cantidades: [],
    precios: [],
    descuento: 0,
    precioTotal: 0,
    fecha: '',
    estado:'reserva',
   
  });
 // const [clientes, setClientes] = useState([]); // Lista de clientes
 // const [productos, setProductos] = useState([]); // Lista de productos
  const [productoSeleccionado, setProductoSeleccionado] = useState(''); // Producto seleccionado
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(''); // Cantidad seleccionada
  const{clientes,getClientes}=useClientes ()
  const{productos,getProductos}=useProducto ()
  

const traerUsuarios = async()=>{
  const respuesta = await findAll();
 setUsuario(respuesta.data)
 
}
  useEffect(() => {
traerUsuarios()
 
    getClientes()
    getProductos()
   
    // Simulación de datos de clientes y productos
   // setClientes([{ id: 1, nombre: 'Cliente 1' }, { id: 2, nombre: 'Cliente 2' }]);
  //  setProductos([{ id: 1, nombre: 'Producto 1', precio: 10 }, { id: 2, nombre: 'Producto 2', precio: 15 }]);
  }, []);

  useEffect(() => {
    // Calcular el precio total al actualizar los precios de los productos
    const total = alquilerForm.precios.reduce((acc, precio) => acc + precio, 0);
    setAlquilerForm((prevForm) => ({ ...prevForm, precioTotal: total }));
  }, [alquilerForm.precios]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
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
        productos: [...prevForm.productos, producto],
        cantidades: [...prevForm.cantidades, cantidadSeleccionada],
        precios: [...prevForm.precios, cantidadSeleccionada * producto.precio],
      }));
     

    }
   alquilerForm.precios.forEach(p=>{
    alquilerForm.total=alquilerForm.total + p;
   })
    // Limpiar selección después de agregar el producto
    setProductoSeleccionado('');
    setCantidadSeleccionada('');
  };

  const eliminarProducto = (index) => {
    setAlquilerForm((prevForm) => {
      const productosCopy = [...prevForm.productos];
      const cantidadesCopy = [...prevForm.cantidades];
      const preciosCopy = [...prevForm.precios];

      productosCopy.splice(index, 1);
      cantidadesCopy.splice(index, 1);
      preciosCopy.splice(index, 1);

      return {
        ...prevForm,
        productos: productosCopy,
        cantidades: cantidadesCopy,
        precios: preciosCopy
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
   console.log(usuario);
   let u=usuario.filter(f=>f.username==user.username)
   u=u[0]
   
    setAlquilerForm((prevForm) => ({
      ...prevForm,
      usuario: u, // Esta asignación no tendrá el valor correcto de usuario
      // Otros campos del alquilerForm
    }))
   console.log(alquilerForm);
 handlerAddAlquiler(alquilerForm);

  };
  const onInputChangeCliente = (event) => {
    const { name, value } = event.target;
    const selectedClient = JSON.parse(value); // Parsea el valor seleccionado de nuevo a un objeto
    setAlquilerForm({
      ...alquilerForm,
      [name]: selectedClient || {} // Asigna el cliente seleccionado o un objeto vacío si no se encuentra
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
      <select
  id="clientes"
  className="form-control my-3 w-75"
  name="cliente"
  value={JSON.stringify(alquilerForm.cliente) || ''} // Asigna el objeto cliente completo como valor
  onChange={onInputChangeCliente} // Cambia el nombre de la función de manejo de cambio
>
  <option value="">Seleccione un cliente</option>
  {clientes.map((c) => (
    <option key={c.id} value={JSON.stringify(c)}>
      {c.nombre}
    </option>
  ))}
</select>
<label htmlFor="cantidad">direccion:</label>
        <input
          id="direccion"
          className="form-control my-3 w-75"
          type="text"
          min="1"
          name="direccion"
          value={alquilerForm.direccion}
          onChange={onInputChange}
        />


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
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th> {/* Columna para el botón de eliminar */}
            </tr>
          </thead>
          <tbody>
            {alquilerForm.productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{alquilerForm.cantidades[index]}</td>
                <td>${alquilerForm.precios[index]}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(index)}> {/* Manejar el evento de clic para eliminar */}
                    Eliminar
                  </button>
                </td>
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
           <input
           disabled
          id="total"
          className="form-control my-3 w-75"
          type="number"
          min="0"
          step="0.01"
          name="descuento"
          value={alquilerForm?.precioTotal || ''}
          onChange={onInputChange}
        />

        <button  className="btn btn-primary" type="submit">
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
