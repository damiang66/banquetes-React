import React, { useEffect, useState } from 'react';
import { ProductoList } from '../productos/ProductoList';
import { useAlquiler } from '../../hooks/useAlquiler';

export const AlquileresVerProducto = ({ isOpen, onClose, productos, cantidad }) => {
    if (!isOpen) return null;

    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log(productos);
        if (productos && cantidad && productos.length === productos.length) {
            const newItems = productos.map((p, index) => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                cantidad: cantidad[index]
            }));
            setItems(newItems);
        }
    }, [productos, cantidad]);

    return (
        <>
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Modal Productos
                            </h5>
                            <button onClick={onClose} className='btn btn-danger'>cerrar</button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>nombre</th>
                                        <th>precio</th>
                                        <th>cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
    {items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.precio}</td>
            <td>{item.cantidad}</td>
        </tr>
    ))}
</tbody>

                            </table>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
        </>
    );
};