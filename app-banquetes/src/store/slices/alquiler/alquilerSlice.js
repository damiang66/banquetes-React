import { createSlice } from "@reduxjs/toolkit";
export const inicialAlquiler = {
    id: 0,
    cliente: {},
    usuario: {},
    direccion: '',
    productos: [],
    cantidad:[],
    descuento:0,
    precioTotal:0,
    fecha:'',
    fechaDeAlta:'',
    alquilado:false,
    retirado:false,

}
const initialErrors = {
    cliente: {},
    usuario: {},
    direccion: '',
    productos: [],
    cantidad:[],
    descuento:0,
    precioTotal:0,
}
export const alquilerSlice = createSlice({
    name: 'alquileres',
    initialState:{
        alquileres:[],
        alquilerSelected:inicialAlquiler,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addAlquiler:(state,action)=>{
            state.alquileres=[
                ...state.alquileres,
                {
                    ...action.payload,
                }
            ];
           state.alquilerSelected=inicialAlquiler;
           // state.visibleForm=false;
           
        },
        removeAlquileres:(state,action)=>{
            state.alquileres= state.alquileres.filter(u=>u.id !== action.payload)
        },
        updateAlquileres:(state,action)=>{
            state.alquileres=state.alquileres.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.alquilerSelected=inicialAlquiler;
            state.visibleForm=false;
        },
        loadingAlquileres:(state,action)=>{
           // console.log(state);
            state.alquileres = action.payload
        },
        onAlquilerSeleccionadoForm:(state,action)=>{
            state.alquilerSelected= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
          //  state.userSelected=initialUserForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addAlquiler,
    removeAlquileres,
    updateAlquileres,
    loadingAlquileres,
    onAlquilerSeleccionadoForm,
    onOpenForm,
    onCloseForm,
    onError,
    visibleForm
    
}=alquilerSlice.actions;