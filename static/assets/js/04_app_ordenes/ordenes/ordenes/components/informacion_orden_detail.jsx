import React, {Fragment} from 'react';

const OrdenInformacion = (props) => {
    const {object} = props;
    return (
        <Fragment>
            {
                object.nro_orden &&
                <div className="col-12">
                    <h3>Nro. Orden: <small>{object.nro_orden}</small></h3>
                </div>
            }
            <div className="col-12 pb-3">
                <strong>Paciente:</strong> {object.paciente_nombre}<br/>
                <small>{object.paciente_identificacion}</small>
                <br/>
                {
                    object.paciente_email &&
                    <small>{object.paciente_email.toLowerCase()}</small>
                }
            </div>
            <div className="col-md-6">
                <strong>Entidad:</strong> {object.entidad_nombre}<br/>
            </div>
            <div className="col-md-6">
                <strong>Médico Remitente:</strong> {object.medico_remitente_nombre}
            </div>
            <div className="col-md-6">
                <strong>Forma de Pago:</strong> {object.tipo_pago}
            </div>
            <div className="col-12 pt-4">
                <h4>Contacto Alternativo</h4>
            </div>
            <div className="col-md-6 col-xl-6 pl-4">
                <strong>Nombre </strong>{object.nombre_contacto_alternativo}
            </div>
            <div className="col-md-6 col-xl-8 pl-4">
                <strong>Número </strong>{object.numero_contacto_alternativo}
            </div>
            <div className="col-md-12 pl-4">
                <strong>Dirección </strong>{object.direccion_contacto_alternativo}
            </div>
        </Fragment>
    )
}
export default OrdenInformacion;