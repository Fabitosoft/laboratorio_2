import React, {Fragment} from 'react';
import {FlatIconModal} from '../../../00_utilities/components/ui/icon/iconos_base';
import {fechaFormatoUno} from "../../../00_utilities/common";

const TablaResultadoConsultaWeb = (props) => {
    const {
        ordenes_examenes,
        onCerrarConsulta,
    } = props;
    const ordenes_examenes_array = _.map(ordenes_examenes, e => e);
    const {
        nro_orden,
        paciente_nombre,
        created,
        paciente_identificacion
    } = ordenes_examenes_array[0];
    return (
        <div className='container pt-4 text-center'>
            <h4>Consulta de Resultados</h4>
            <div className="row text-justify">
                <div className="col-6">
                    <strong>Paciente: </strong>{paciente_nombre}
                </div>
                <div className="col-6">
                    <strong>Nro. Orden: </strong>{nro_orden}
                </div>
                <div className="col-6">
                    <strong>Nro. Identificación: </strong>{paciente_identificacion}
                </div>
                <div className="col-6">
                    <strong>Fecha Ingreso: </strong>{fechaFormatoUno(created)}
                </div>
            </div>
            <table className='table table-striped table-responsive text-justify'>
                <thead>
                <tr>
                    <th>Código Cups</th>
                    <th>Nro. Examen</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Ver</th>
                </tr>
                </thead>
                <tbody>

                {ordenes_examenes_array.map(e => {
                    return (
                        <tr key={e.id}>
                            <td>{e.examen_codigo_cups}</td>
                            <td>{e.nro_examen}</td>
                            <td>{e.examen_nombre}</td>
                            <td>{e.examen_estado_nombre}</td>
                            {
                                e.examen_estado === 2 ?
                                    <td>
                                        {
                                            e.no_email ?
                                                <span>Reclamar Personalmente</span> :
                                                <i className='far fa-file-pdf puntero fa-2x'
                                                   onClick={() => window.open(e.pdf_examen, "_blank")}
                                                >
                                                </i>
                                        }
                                    </td> :
                                    <td></td>
                            }
                        </tr>
                    )
                })}

                </tbody>
            </table>
            <FlatIconModal
                text="Cerrar"
                onClick={() => {
                    onCerrarConsulta();
                }}
            />
        </div>

    )
};

export default TablaResultadoConsultaWeb;