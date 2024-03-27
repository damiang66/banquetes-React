import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';
import { ProductoDelete, ProductoFindAll, ProductoSave, ProductoUpdate } from '../services/ProductoService';
import { onError } from '../store/slices/cliente/clienteSlice';
import { addProductos, loadingProductos, removeProductos, updateProductos } from '../store/slices/producto/productoSlice';
import Swal from 'sweetalert2';

export const useProducto = () => {
    const {productos,productosSelected,visibleForm,errors}= useSelector(state=>state.productos)
    const dispatch= useDispatch();
    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();
    const getProductos = async() =>{
        try {
            const resultado = await ProductoFindAll();
            dispatch(loadingProductos(resultado.data))
            
        } catch (error) {
            throw error;
        }
    }
    const handlerAddProductos = async (producto)=>{
        if (!login.isAdmin)return;
        let respuesta;
        try {
            if(producto.id === undefined){
                respuesta = await ProductoSave(producto);
                dispatch(addProductos(respuesta.data))
            }else{
                respuesta= await ProductoUpdate(producto);
                dispatch(updateProductos(respuesta.data))

            }
            Swal.fire(
                (producto.id === 0) ?
                    'Producto Creado' :
                    'Producto Actualizado',
                (producto.id === 0) ?
                    'El producto ha sido creado con exito!' :
                    'El producto ha sido actualizado con exito!',
                'success'
            );
           // handlerCloseForm();

            navigate('/productos/lista');
        } catch (error) {
            dispatch(onError(error?.response?.data))
        }
    }
    
    const handlerRemoveProductos= (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el producto sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await ProductoDelete(id);
                    dispatch(removeProductos(id));
                    Swal.fire(
                        'Producto Eliminado!',
                        'El producto ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerProductoSelectedForm = (producto) => {
      
   dispatch(productosSelected({...producto}))
    }

    const handlerOpenForm = () => {
     
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
      dispatch(onCloseForm())
      dispatch( onError({}));
    }
  return {
handlerAddProductos,
handlerProductoSelectedForm,
handlerRemoveProductos,
productos,
errors,
getProductos,
productosSelected,
handlerOpenForm,
handlerCloseForm,
visibleForm,

  }
  
  
}
