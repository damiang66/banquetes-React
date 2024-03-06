import { Route, Routes } from "react-router-dom"
import { PaginaPrincipal } from "../PaginaPrincipal"
import { RegistroUsuario } from "../RegistroUsuario"
import { UsuarioLista } from "../UsuarioLista"


export const Rutas = () => {
  return (
    <Routes>
        <Route path="/" element={ <PaginaPrincipal /> } />
        <Route path="UsuarioRegistro" element={ <RegistroUsuario /> } />
        <Route path="UsuarioLista" element={ <UsuarioLista /> } />
       
      </Routes>
  )
}
