import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { AlquilerDelete, AlquilerFindAll, AlquilerSave, AlquilerUpdate } from "../services/AlquilerService";
import { addAlquiler, loadingAlquileres, onAlquilerSeleccionadoForm, onError, removeAlquileres, updateAlquileres } from "../store/slices/alquiler/alquilerSlice";
import { useState } from "react";
export const useAlquiler =()=>{

const {alquileres,alquilerSelected,errors,visibleForm}=useSelector(state=>state.alquileres);
const dispatch = useDispatch();
const navigate = useNavigate();
const { login, handlerLogout } = useAuth();
const [visibleProducto, setvisibleProducto] = useState(false)

const getAlquileres = async()=>{
    try {
        const respuesta = await AlquilerFindAll ()
        dispatch(loadingAlquileres(respuesta.data))
    } catch (error) {
        throw error;
    }
}
const handlerAddAlquiler = async (alquiler)=>{
    if(!login.isAdmin){
        return
    }
    let respuesta;
    try {
       if(alquiler.id === undefined){
        respuesta = await AlquilerSave(alquiler)
        dispatch(addAlquiler(respuesta.data))
       }else{
        respuesta = await AlquilerUpdate(alquiler);
        dispatch(updateAlquileres(respuesta.data))
       }
       Swal.fire(
        (cliente.id === 0) ?
            'Alquiler Creado' :
            'Alquiler Actualizado',
        (cliente.id === 0) ?
            'El alquiler ha sido creado con exito!' :
            'El alquiler ha sido actualizado con exito!',
        'success'
    );
   // handlerCloseForm();
    navigate('/alquileres/lista');

    } catch (error) {
        if (error.response && error.response.status == 400) {
            dispatch(onError(error.response.data));
        }
    }
}
const handlerRemoveAlquiler = (id) => {
    // console.log(id);

    if (!login.isAdmin) return;

    Swal.fire({
        title: 'Esta seguro que desea eliminar?',
        text: "Cuidado el alquiler sera eliminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then( async(result) => {
        if (result.isConfirmed) {

            try {
                await AlquilerDelete(id);
                dispatch(removeAlquileres(id));
                Swal.fire(
                    'Alquiler Eliminado!',
                    'El alquiler ha sido eliminado con exito!',
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
const handlerOpenForm = () => {
     
    dispatch(onOpenForm())
}

const handlerAlquilerSelectedForm = (alquiler) => {
  
dispatch(onAlquilerSeleccionadoForm({...alquiler}))
}
const abrirModalProductos=()=>{
setvisibleProducto(true);
}
const cerrarModalPropucto=()=>{
    setvisibleProducto(false);
}
return {
    getAlquileres,handlerAddAlquiler,handlerAlquilerSelectedForm,errors,alquileres,alquilerSelected,handlerRemoveAlquiler,visibleForm,handlerOpenForm,abrirModalProductos,cerrarModalPropucto,visibleProducto}
}

