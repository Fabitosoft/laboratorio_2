import React, {Fragment} from "react";
import ReactTable from "react-table";
import {fechaFormatoUno} from "../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {
        const {
            verOrden,
            permisos,
        } = this.props;
        const data = _.orderBy(this.props.data, ['created'], ['desc']);

        return (
            <ReactTable
                data={_.map(data, e => e)}
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
                        ]
                    },
                    {
                        Header: "Opciones",
                        columns: [
                            {
                                Header: "Orden",
                                accessor: "id",
                                maxWidth: 60,
                                Cell: row => {
                                    return (
                                        <Fragment>
                                            {
                                                row.original.estado === 1 &&
                                                <Fragment>
                                                    <i className='far fa-file-pdf puntero pr-3'
                                                       style={{color: 'blue'}}
                                                       onClick={() => verOrden(row.value)}
                                                    >
                                                    </i>
                                                    {
                                                        permisos.imprimir_sin_logo &&
                                                        <i className='far fa-file-pdf puntero'
                                                           style={{color: 'green'}}
                                                           onClick={() => verOrden(row.value, false)}
                                                        >
                                                        </i>
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