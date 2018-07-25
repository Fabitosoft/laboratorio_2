import React, {Fragment} from "react";
import ReactTable from "react-table";
import {fechaFormatoUno} from "../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {
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
                                Header: "Nro. Examen",
                                accessor: "nro_examen",
                                maxWidth: 100,
                                filterable: true
                            },
                            {
                                Header: "Nro. Examen Especial",
                                accessor: "nro_examen_especial",
                                maxWidth: 150,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row._original.nro_examen_especial ? row[filter.id].includes(filter.value.toUpperCase()) : false
                                }
                            },
                            {
                                Header: "Nombre",
                                accessor: "examen_nombre",
                                minWidth: 250,
                                maxWidth: 400,
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
                                Header: "Fecha Ingreso",
                                accessor: "created",
                                maxWidth: 150,
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
                                maxWidth: 100,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                                }
                            },
                            {
                                Header: "Estado",
                                accessor: "examen_estado_nombre",
                                maxWidth: 100,
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
                                Header: "Ver",
                                accessor: "pdf_examen",
                                maxWidth: 60,
                                Cell: row => {
                                    return (
                                        <Fragment>
                                            {
                                                row.original.examen_estado === 2 &&
                                                <i className='far fa-file-pdf puntero'
                                                   onClick={() => window.open(row.value, "_blank")}
                                                >
                                                </i>
                                            }
                                        </Fragment>
                                    )
                                }

                            },
                        ]
                    }
                ]}
                defaultPageSize={100}
                className="-striped -highlight tabla-maestra"
            />
        );
    }
}

export default Tabla;