import { NavLink } from "react-router-dom"


export const PaginaPrincipal = () => {
  return (
    <>
   <NavLink to={'/UsuarioRegistro'}>Registro Usuario</NavLink>
   
   <NavLink to={'/UsuarioLista'}>Lista usuario</NavLink>
   </>
  )
}
