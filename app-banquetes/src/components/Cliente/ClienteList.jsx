import React, { useEffect, useState } from 'react'
import { clienteFindAll } from '../../services/clienteService'
import { ClienteRow } from './ClienteRow'
import { useClientes } from '../../hooks/useClientes'
import { useAuth } from '../../auth/hooks/useAuth'

export const ClienteList = () => {
    //const [clientes, setClientes] = useState([])
    const {clientes,getClientes}= useClientes();
    const { login } = useAuth();
    
  return (
  <>
    <table className="table table-hover table-striped">

<thead>
  {console.log(clientes)}
    <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Emaill</th>
        <th>Telefono</th>
        <th>Direccion</th>
        {!login.isAdmin || <>
            <th>Editar</th>
            <th>Editar por la ruta</th>
            <th>Elimanar</th>
        </>}
    </tr>
</thead>
<tbody>
    {
        clientes.map(({ id, nombre, apellido, email,telefono,direccion }) => (
            <ClienteRow
                key={id}
                id={id}
                nombre={nombre}
                apellido={apellido}
                email={email}
                telefono={telefono}
                
                direccion={direccion}
            />
        ))
    }
</tbody>
</table>

  </>
  )
}
