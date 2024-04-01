import React from 'react'
import {
    ProductoList
} from '../productos/ProductoList'
import { useAlquiler } from '../../hooks/useAlquiler'

export const AlquileresVerProducto = ({isOpen,onClose}) => {
  if(!isOpen) return null;
   
   
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                              Modal Productos
                            </h5>
                        </div>
                        <div className="modal-body">
                            <ProductoList   
                             /*   userSelected={userSelected}
                                handlerCloseForm={handlerCloseForm}*/
                            />
                            <button onClick={onClose} className='btn btn-danger'>cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
