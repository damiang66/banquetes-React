import { createSlice } from "@reduxjs/toolkit";
export const initialClienteForm = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion:'',
}
const initialErrors = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion:'',
}
export const clienteSlice = createSlice({
    name: 'clientes',
    initialState:{
        clientes:[],
        userSelected:initialClienteForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addCLientes:(state,action)=>{
            state.clientes=[
                ...state.clientes,
                {
                    ...action.payload,
                }
            ];
          //  state.userSelected=initialUserForm;
           // state.visibleForm=false;
           
        },
        removeCLientes:(state,action)=>{
            state.clientes= state.clientes.filter(u=>u.id !== action.payload)
        },
        updateClientes:(state,action)=>{
            state.clientes=state.clientes.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.userSelected=initialClienteForm;
            state.visibleForm=false;
        },
        loadingClientes:(state,action)=>{
            console.log(state);
            state.clientes = action.payload
        },
        onClienteSelectedForm:(state,action)=>{
            state.userSelected= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.userSelected=initialUserForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addCLientes,
    removeCLientes,
    updateClientes,
    loadingClientes,
    onClienteSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=clienteSlice.actions;