import React, {Fragment} from "react";
import ReactTable from "react-table";
import {fechaFormatoUno} from "../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {
        const {
            verOrden,
            permisos,
            ordenes_examenes,
        } = this.props;
        const data = _.orderBy(this.props.data, ['created'], ['desc']);
        const cantidad_examenes_verificados_por_orden = _.countBy(_.pickBy(ordenes_examenes, exa => exa.examen_estado === 2), e => e.orden);
        const cantidad_examenes_por_orden = _.countBy(ordenes_examenes, e => e.orden);
        const ordenes = _.map(data, o => {
            return {
                ...o,
                examenes_verificados: cantidad_examenes_verificados_por_orden[o.id],
                examenes_totales: cantidad_examenes_por_orden[o.id],
                porcentaje_completado: (parseInt(cantidad_examenes_verificados_por_orden[o.id]) / parseInt(cantidad_examenes_por_orden[o.id]) * 100),
            }
        });

        return (
            <ReactTable
                data={_.map(ordenes, e => e)}
                noDataText={`No hay ordenes para mostrar`}
                columns={[
                    {
                        Header: "Caracteristicas",
                        columns: [
                            {
                                Header: "Nro. Orden",
                                accessor: "nro_orden",
                                maxWidth: 100,
                                filterable: true
                            },
                            {
                                Header: "Fecha Ingreso",
                                accessor: "created",
                                maxWidth: 120,
                                Cell: row => fechaFormatoUno(row.value)
                            },
                            {
                                Header: "Paciente",
                                accessor: "paciente_nombre",
                                minWidth: 100,
                                maxWidth: 250,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                },
                                Cell: row => {
                                    return (
                                        <div style={{
                                            fontSize: '0.6rem',
                                            whiteSpace: 'normal'
                                        }}>{row.value}</div>
                                    )
                                }
                            },
                            {
                                Header: "Documento Paciente",
                                accessor: "paciente_identificacion",
                                minWidth: 200,
                                maxWidth: 250,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                                }
                            },
                            {
                                Header: "Estado",
                                minWidth: 150,
                                maxWidth: 200,
                                Cell: row => <div style={{textAlign: 'right'}}>
                                    <span>
                                        {row.original.examenes_verificados} con resultados de {row.original.examenes_totales}
                                    </span>
                                </div>
                            },
                            {
                                Header: "% Completado",
                                accessor: "porcentaje_completado",
                                minWidth: 70,
                                maxWidth: 100,
                                Cell: row => <div style={{textAlign: 'right'}}><span>{row.value}%</span></div>
                            },
                        ]
                    },
                    {
                        Header: "Opciones",
                        columns: [
                            {
                                Header: "Orden",
                                accessor: "id",
                                maxWidth: 150,
                                Cell: row => {
                                    return (
                                        <Fragment>
                                            {
                                                row.original.estado === 1 &&
                                                <Fragment>
                                                    <i className='far fa-file-pdf puntero pr-2'
                                                       style={{color: 'blue'}}
                                                       onClick={() => verOrden(row.value, true, 0)}
                                                    >
                                                    </i>
                                                    <i className='far fa-print puntero pr-2'
                                                       style={{color: 'blue'}}
                                                       onClick={() => verOrden(row.value, true, 1)}
                                                    >
                                                    </i>
                                                    <i className='far fa-download puntero pr-2'
                                                       style={{color: 'blue'}}
                                                       onClick={() => verOrden(row.value, true, 2)}
                                                    >
                                                    </i>
                                                    {
                                                        permisos.imprimir_sin_logo &&
                                                        <Fragment>
                                                            <i className='far fa-file-pdf puntero pr-2'
                                                               style={{color: 'green'}}
                                                               onClick={() => verOrden(row.value, false, 0)}
                                                            >
                                                            </i>
                                                            <i className='far fa-print puntero pr-2'
                                                               style={{color: 'green'}}
                                                               onClick={() => verOrden(row.value, false, 1)}
                                                            >
                                                            </i>
                                                            <i className='far fa-download puntero pr-2'
                                                               style={{color: 'green'}}
                                                               onClick={() => verOrden(row.value, false, 2)}
                                                            >
                                                            </i>
                                                        </Fragment>
                                                    }
                                                </Fragment>
                                            }
                                        </Fragment>
                                    )
                                }

                            },
                        ]
                    },
                ]}
                defaultPageSize={100}
                className="-striped -highlight tabla-maestra"
            />
        );
    }
}

export default Tabla;