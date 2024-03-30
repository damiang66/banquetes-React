import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useAlquiler} from "../../hooks/useAlquiler"
import { useAuth } from '../../auth/hooks/useAuth';
import {AlquilerList} from "../alquiler/AlquilerList"
export const AlquilerPage = () => {
  const navegate=useNavigate()
  const {
      alquileres,
     visibleForm,
      getAlquileres,
  } = useAlquiler();

  const { login } = useAuth();;

  useEffect(() => {
      getAlquileres();
  }, []);
  const nuevoCliente = ()=>{
      navegate('/alquileres/form')
  }
  return (
      <>

          {!visibleForm ||
              <UserModalForm />}
          <div className="container my-4">
              <h2>Alquileres</h2>
              <div className="row">
                  <div className="col">
                      {(visibleForm || !login.isAdmin) || <button
                          className="btn btn-primary my-2"
                          onClick={()=>nuevoCliente()}>
                         Nuevo Alquiler
                      </button>}

                      {
                          alquileres.length === 0
                              ? <div className="alert alert-warning">No hay alquileres en el sistema!</div>
                              : <AlquilerList />
                      }
                  </div>
              </div>
          </div>
      </>
  );
}
