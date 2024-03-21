import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clienteDelete, clienteFindAll, clienteSave, clienteUpdate } from "../services/clienteService";
import { addCLientes, loadingClientes, onClienteSelectedForm, onCloseForm, onError, onOpenForm, removeCLientes, updateClientes } from "../store/slices/cliente/clienteSlice";
import { useAuth } from "../auth/hooks/useAuth";
import Swal from "sweetalert2";

export const useClientes =()=>{
    const {clientes,clientesSelected,visibleForm,errors}= useSelector(state=>state.clientes)
    const dispatch= useDispatch();
    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getClientes = async () => {
        try {
            
       
        const result = await clienteFindAll();
        console.log(result);
        dispatch(loadingClientes(result.data));
          
     } catch (error) {
            
    }
}

    const handlerAddCliente = async (cliente) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {

            if (cliente.id === 0) {
                response = await clienteSave(cliente);
                dispatch(addCLientes(response.data))
            } else {
                response = await clienteUpdate(cliente);
                dispatch(updateClientes(response.data))
            }

            

            Swal.fire(
                (user.id === 0) ?
                    'Cliente Creado' :
                    'Cliente Actualizado',
                (user.id === 0) ?
                    'El cliente ha sido creado con exito!' :
                    'El cliente ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status == 400) {
               dispatch( onError(error.response.data));
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
            
                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch( onError({ username: 'El username ya existe!' }))
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch( onError({ email: 'El email ya existe!' }))
                }
            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveClientes = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el cliente sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await clienteDelete(id);
                    dispatch(removeCLientes(id));
                    Swal.fire(
                        'Cliente Eliminado!',
                        'El cliente ha sido eliminado con exito!',
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

    const handlerClienteSelectedForm = (cliente) => {
      
   dispatch(onClienteSelectedForm({...cliente}))
    }

    const handlerOpenForm = () => {
     
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
      dispatch(onCloseForm())
      dispatch( onError({}));
    }
    return {
        clientes,
        clientesSelected,
       // initialUserForm,
        visibleForm,
        errors,
        handlerAddCliente,
        handlerRemoveClientes,
        handlerClienteSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getClientes,
    }
}