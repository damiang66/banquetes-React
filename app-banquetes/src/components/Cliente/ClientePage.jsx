import React, { useEffect } from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { ClienteList } from './ClienteList';

export const ClientePage = () => {
    const {
        clientes,
        visibleForm,
        handlerOpenForm,
        getClientes,
    } = useClientes();

    const { login } = useAuth();;

    useEffect(() => {
        getClientes();
    }, []);
    
    return (
        <>

            {!visibleForm ||
                <UserModalForm />}
            <div className="container my-4">
                <h2>Clientes</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={console.log()}>
                            Nuevo Cliente
                        </button>}

                        {
                            clientes.length === 0
                                ? <div className="alert alert-warning">No hay clientes en el sistema!</div>
                                : <ClienteList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
