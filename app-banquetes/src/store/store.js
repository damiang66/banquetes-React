import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { clienteSlice } from "./slices/cliente/clienteSlice";
import { productoSlice } from "./slices/producto/productoSlice";
import { alquilerSlice } from "./slices/alquiler/alquilerSlice";

export const store = configureStore({
    reducer:{
        users:userSlice.reducer,
        auth:authSlice.reducer,
        clientes:clienteSlice.reducer,
        productos:productoSlice.reducer,
        alquileres:alquilerSlice.reducer,
    }
})