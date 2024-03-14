import { useDispatch, useSelector } from "react-redux";

export const useCliente =()=>{
    const {clientes,clientesSelected,visibleForm,errors}= useSelector(state=>state.clientes)
    const dispatch= useDispatch();
    return{

    }
}