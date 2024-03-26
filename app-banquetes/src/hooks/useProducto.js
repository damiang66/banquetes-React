import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';
import { ProductoFindAll } from '../services/ProductoService';

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
  return {

  }
  
  
}
