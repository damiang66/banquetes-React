import React, { useEffect, useState } from 'react';
import { ClienteBuscar } from '../../services/clienteService';
import { ClienteRow } from './ClienteRow';
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';

export const ClienteList = () => {
    const { clientes, getClientes } = useClientes();
    const [clientesb, setClientesb] = useState([]);
    const [nombre, setNombre] = useState('');
    const { login } = useAuth();

    useEffect(() => {
        setClientesb(clientes);
    }, [clientes]);

    const buscar = async () => {
        try {
            const respuesta = await ClienteBuscar(nombre);
            setClientesb(respuesta.data);
        } catch (error) {
            console.error('Error al buscar clientes:', error);
            // Manejar el error si es necesario
        }
    };

    const restablecer = () => {
        setNombre('');
        setClientesb(clientes);
    };

    const onInputChange = (event) => {
        const { value } = event.target;
        setNombre(value);
        if (value === '') {
            restablecer();
        } else {
            buscar();
        }
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input name="buscar" value={nombre} onChange={onInputChange} className="form-control me-2" placeholder="Buscar" />
                        <button onClick={restablecer} className="btn btn-outline-success" type="button">Restablecer</button>
                    </form>
                </div>
            </nav>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        {!login.isAdmin || (
                            <>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {clientesb.map(({ id, nombre, apellido, email, telefono, direccion }) => (
                        <ClienteRow
                            key={id}
                            id={id}
                            nombre={nombre}
                            apellido={apellido}
                            email={email}
                            telefono={telefono}
                            direccion={direccion}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};