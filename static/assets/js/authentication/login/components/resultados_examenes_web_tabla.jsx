import React, {Component} from 'react';
import {FlatIconModal} from '../../../00_utilities/components/ui/icon/iconos_base';
import {fechaFormatoUno} from "../../../00_utilities/common";

const style = {
    table: {
        fontSize: '0.8rem',
        tr: {
            td: {
                paddingTop: 0,
                paddingBottom: 0,
                margin: 0,
                nombre: {
                    whiteSpace: 'normal',
                    paddingTop: 0,
                    paddingBottom: 0,
                    margin: 0,
                    maxWidth: '450px'
                }
            }
        }
    }
};

class TablaResultadoConsultaWeb extends Component {
    verOrden(orden_id) {
        const {
            cargando,
            noCargando,
            notificarErrorAjaxAction,
            printOrdenesExamenes_en_orden_cliente,
            identificacion,
            codigo_consulta,
        } = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            window.open(url, "_blank");
            noCargando();
        };

        printOrdenesExamenes_en_orden_cliente(
            orden_id,
            identificacion,
            codigo_consulta,
            success_callback, (r) => {
                notificarErrorAjaxAction(r, 60000);
                noCargando();
            })
    }

    AbrirExamen(examen_id) {
        const {
            cargando,
            noCargando,
            notificarErrorAjaxAction,
            printOrdenExamen_cliente,
            identificacion,
            codigo_consulta,
        } = this.props;
        cargando();
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            window.open(url, "_blank");
            noCargando();
        };
        printOrdenExamen_cliente(
            examen_id,
            identificacion,
            codigo_consulta,
            success_callback, (r) => {
                notificarErrorAjaxAction(r, 60000);
                noCargando();
            })
    }

    render() {
        const {
            ordenes_examenes,
            onCerrarConsulta,
        } = this.props;
        const ordenes_examenes_array = _.map(ordenes_examenes, e => e);

        const examenes_completados = _.size(_.pickBy(ordenes_examenes, e => e.examen_estado === 2));
        const examenes_totales = _.size(ordenes_examenes);
        const porcentaje_completado = examenes_completados / examenes_totales;
        const {
            nro_orden,
            paciente_nombre,
            created,
            paciente_identificacion,
            orden
        } = ordenes_examenes_array[0];
        const getEstadoExamen = (estado_examen) => {
            switch (estado_examen) {
                case 0:
                    return 'En Proceso (1 de 3)';
                case 1:
                    return 'En Verificación (2 de 3)';
                case 2:
                    return 'Disponible (3 de 3)';
            }
        };
        return (
            <div className='container pt-4'>
                <h4>Consulta de Resultados <span
                    style={{color: 'red'}}>(Orden {porcentaje_completado * 100}% completado)</span></h4>
                <div className="row text-justify">
                    <div className="col-md-6">
                        <strong>Paciente: </strong>{paciente_nombre}
                    </div>
                    <div className="col-md-6">
                        <strong>Nro. Orden: </strong>{nro_orden}
                    </div>
                    <div className="col-md-6">
                        <strong>Nro. Identificación: </strong>{paciente_identificacion}
                    </div>
                    <div className="col-md-6">
                        <strong>Fecha Ingreso: </strong>{fechaFormatoUno(created)}
                    </div>
                    <div className="col-12 text-right">
                        <i className='far fa-file-pdf fa-2x puntero' onClick={() => this.verOrden(orden)}>
                        </i> Imprima aquí en un solo archivo.<br/>
                        <span
                            style={{color: 'red'}}>{porcentaje_completado !== 1 && `Aún faltan ${examenes_totales - examenes_completados} examenes por completarse`}</span>
                    </div>
                </div>

                <table className='table table-striped table-responsive text-justify' style={style.table}>
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
                            <tr key={e.id} style={style.table.tr}>
                                <td style={style.table.tr.td}>{e.examen_codigo_cups}</td>
                                <td style={style.table.tr.td}>{e.nro_examen}</td>
                                <td style={style.table.tr.td.nombre}>{e.examen_nombre}</td>
                                <td style={style.table.tr.td}>{getEstadoExamen(e.examen_estado)}</td>
                                {
                                    e.examen_estado === 2 ?
                                        <td style={style.table.tr.td}>
                                            {
                                                e.no_email ?
                                                    <span>Reclamar Personalmente</span> :
                                                    <i className='far fa-file-pdf puntero fa-2x'
                                                       onClick={() => this.AbrirExamen(e.id, "_blank")}
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
    }
};

export default TablaResultadoConsultaWeb;