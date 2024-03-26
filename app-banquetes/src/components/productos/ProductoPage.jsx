import React, { useEffect } from 'react'
import { useProducto } from '../../hooks/useProducto';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ProductoList } from './ProductoList';

export const ProductoPage = () => {
  const navegate=useNavigate()
    const {
        productos,
        visibleForm,
        handlerOpenForm,
        getProductos,
    } = useProducto();

    const { login } = useAuth();;

    useEffect(() => {
        getProductos();
    }, []);
    const nuevoProducto = ()=>{
        navegate('/productos/form')
    }
  return (
   <>
    <div className="container my-4">
                <h2>Productos</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={()=>nuevoProducto()}>
                          Nuevo Producto
                        </button>}

                        {
                            productos.length === 0
                                ? <div className="alert alert-warning">No hay productos en el sistema!</div>
                                : <ProductoList />
                        }
                    </div>
                </div>
            </div>
   </>)
}
