import { createSlice } from "@reduxjs/toolkit";
export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}
const initialErrors = {
    username: '',
    password: '',
    email: '',
}
export const clienteSlice = createSlice({
    name: 'clientes',
    initialState:{
        clientes:[],
        userSelected:initialUserForm,
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
            state.userSelected=initialUserForm;
            state.visibleForm=false;
        },
        loadingClientes:(state,action)=>{
            state.clientes = action.payload
        },
        onUserSelectedForm:(state,action)=>{
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
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=clienteSlice.actions;