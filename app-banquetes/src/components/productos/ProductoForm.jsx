import React, { useEffect, useState } from 'react'
import { useProducto } from '../../hooks/useProducto';
import { NavLink } from 'react-router-dom';
import { CategoriaFindAll } from '../../services/ProductoService';
const productoIncial = {
    id:0,
    categoria:{},
    cantidad:0,
    cantidad_minima:0,
    cantidadEnAlquiler:0,
    precio:0,
}
export const ProductoForm = ({ producto }) => {
    const { handlerAddProductos, errors } = useProducto();
    const [productoForm, setProductoForm] = useState(productoIncial
      
    );
    const [categorias, setcategorias] = useState([])
    useEffect(() => {
        getCategorias()
        if (producto) {
            setProductoForm(producto)
        } else {
            setProductoForm(...productoForm,
                id = 0,
                )
        }

    }, [producto])
    const getCategorias = async () => {
        try {
            const respuesta = await CategoriaFindAll();
            console.log(respuesta);
            setcategorias(respuesta.data)
        } catch (error) {
            throw error;
        }
    }
    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        console.log(value);
        setProductoForm({
            ...productoForm,
            [name]: value,
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();
      
        if(productoForm.categoria===undefined){
          productoForm.categoria = categorias[0];
          console.log(productoForm.categoria);
        }
        handlerAddProductos(productoForm);
    }

    return (

        <div>
            <form onSubmit={onSubmit}>
                <input
                    className="form-control my-3 w-75"
                    placeholder="nombre"
                    name="nombre"
                    value={productoForm?.nombre}
                    onChange={onInputChange} />
                <p className="text-danger">{errors?.nombre}</p>
                <input
                    className="form-control my-3 w-75"
                    placeholder="cantidad"
                    name="cantidad"
                    value={productoForm?.cantidad}
                    onChange={onInputChange} />


                <input
                    className="form-control my-3 w-75"
                    placeholder="cantidad_minima"
                    name="cantidad_minima"
                    value={productoForm?.cantidad_minima}
                    onChange={onInputChange} />

                <input
                type='hiden'
                    className="form-control my-3 w-75"
                    placeholder="cantidad en Alguiler"
                    name="cantidadEnAlquiler"
                    value={productoForm?.cantidadEnAlquiler}
                    onChange={onInputChange} />
                    <input
                    className="form-control my-3 w-75"
                    placeholder="precio"
                    name="precio"
                    value={productoForm?.precio}
                    onChange={onInputChange} />

              
<select 
    name="categoria" 
    value={productoForm?.categoria?.id} 
    className="form-select" 
    aria-label="Seleccione categoria"
    onChange={(e) => {
        const selectedCategoria = categorias.find(c => c.id === parseInt(e.target.value));
        setProductoForm({...productoForm, categoria: selectedCategoria});
    }}
>
    {categorias.map((c) => (
        <option key={c.id} value={c.id}>{c.nombre}</option>
    ))}
</select>





                <input type="hidden"
                    name="id"
                    value={productoForm?.id} />

                <button
                    className="btn btn-primary m-2"
                    type="submit">
                    {producto?.id > 0 ? 'Editar' : 'Crear'}
                </button>

                <NavLink
                    className="btn btn-primary mx-2 m-2"
                    type="button"
                    to={'/productos/lista'}>
                    Cerrar
                </NavLink>

            </form>
        </div>
    )
}
