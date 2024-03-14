import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export const PaginaPrincipal = () => {
 //   const navigate = useNavigate();
  return (
    <div>
<h2>Pagina Principal</h2>
<NavLink className='btn btn-primary' to={"/clientes/Lista"} >Clientes</NavLink>

    </div>
  )
}
