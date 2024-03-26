import { createSlice } from "@reduxjs/toolkit";
export const initialProductoForm = {
    id: 0,
    nombre: '',
    cateforia: '',
    cantidad: 0,
    cantidad_minima: 0,
    cantidadEnAlquiler:0,
}
const initialErrors = {
    nombre: '',
    cateforia: '',
    cantidad: 0,
    cantidad_minima: 0,
    cantidadEnAlquiler:0,
}
export const productoSlice = createSlice({
    name: 'productos',
    initialState:{
        productos:[],
        userSelected:initialProductoForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addProductos:(state,action)=>{
            state.productos=[
                ...state.productos,
                {
                    ...action.payload,
                }
            ];
          //  state.userSelected=initialUserForm;
           // state.visibleForm=false;
           
        },
        removeProductos:(state,action)=>{
            state.productos= state.productos.filter(u=>u.id !== action.payload)
        },
        updateProductos:(state,action)=>{
            state.productos=state.productos.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
//state.userSelected=initialClienteForm;
  //          state.visibleForm=false;
        },
        loadingProductos:(state,action)=>{
            console.log(state);
            state.productos = action.payload
        },
        onProductoSelectedForm:(state,action)=>{
           // state.userSelected= action.payload;
            //state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.userSelected=initialProductoForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addProductos,
    removeProductos,
    updateProductos,
    loadingProductos,
    //onClienteSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=productoSlice.actions;