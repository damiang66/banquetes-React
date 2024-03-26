import React, { useEffect, useState } from 'react'
import { useProducto } from '../../hooks/useProducto';
import { useParams } from 'react-router-dom';
import { ProductoForm } from './ProductoForm';

export const ProductoFormPage = () => {
  const[titulo,setTitulo]=useState('')
  const {productos=[],getProductos}= useProducto();
  const [productoSeleccionado,setProductoSeleccionado]=useState({});
  const {id}=useParams()
  useEffect(()=>{
    getProductos()
console.log(id);
  if(id){
    setTitulo( 'Editar Producto')
    const producto = productos.find(u => u.id == id)
    setProductoSeleccionado(producto);
  }else{
   setTitulo('Registro de Producto')
  }
  },[])
  return (
    <div className="container my-4">
    <h4>{titulo}</h4>
    <div className="row">
        <div className="col">
            <ProductoForm producto={productoSeleccionado} />
        </div>
    </div>
</div>
  )
  
}
