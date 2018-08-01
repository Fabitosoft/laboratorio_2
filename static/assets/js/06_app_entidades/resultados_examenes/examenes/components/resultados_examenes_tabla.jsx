import React, {Fragment} from "react";
import ReactTable from "react-table";
import {fechaFormatoUno} from "../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {
        const {
            verExamen,
            permisos
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
                                Header: "Nro. Examen",
                                accessor: "nro_examen",
                                maxWidth: 100,
                                filterable: true
                            },
                            {
                                Header: "Nro. Exa. Especial",
                                accessor: "nro_examen_especial",
                                maxWidth: 100,
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
                                maxWidth: 100,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                                }
                            },
                            {
                                Header: "Estado",
                                accessor: "examen_estado",
                                maxWidth: 150,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    let estado = '';
                                    switch (row[filter.id]) {
                                        case 0:
                                            estado = 'En Proceso (1 de 3)';
                                            break;
                                        case 1:
                                            estado = 'En Verificación (2 de 3)';
                                            break;
                                        case 2:
                                            estado = 'Disponible (3 de 3)';
                                            break;
                                    }
                                    return estado.toUpperCase().includes(filter.value.toUpperCase())
                                },
                                Cell: row => {
                                    const estado = (estado_examen) => {
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
                                        <div style={{
                                            fontSize: '0.6rem',
                                            whiteSpace: 'normal'
                                        }}>
                                            {estado(row.value)}
                                        </div>
                                    )

                                }
                            },
                        ]
                    },
                    {
                        Header: "Opciones",
                        columns: [
                            {
                                Header: "Examen",
                                maxWidth: 150,
                                Cell: row => {
                                    return (
                                        <Fragment>
                                            {
                                                row.original.examen_estado === 2 &&
                                                <Fragment>
                                                    <i
                                                        className='far fa-file-pdf puntero pr-2'
                                                        style={{color: 'blue'}}
                                                        onClick={() => verExamen(row.original.id, true, 0)}
                                                    >
                                                    </i>
                                                    <i
                                                        className='far fa-print puntero pr-2'
                                                        style={{color: 'blue'}}
                                                        onClick={() => verExamen(row.original.id, true, 1)}
                                                    >
                                                    </i>
                                                    <i
                                                        className='far fa-download puntero pr-2'
                                                        style={{color: 'blue'}}
                                                        onClick={() => verExamen(row.original.id, true, 2)}
                                                    >
                                                    </i>
                                                    {
                                                        permisos.imprimir_sin_logo &&
                                                        <Fragment>
                                                            <i
                                                                className='far fa-file-pdf puntero pr-2'
                                                                style={{color: 'green'}}
                                                                onClick={() => verExamen(row.original.id, false, 0)}
                                                            >
                                                            </i>
                                                            <i
                                                                className='far fa-print puntero pr-2'
                                                                style={{color: 'green'}}
                                                                onClick={() => verExamen(row.original.id, false, 1)}
                                                            >
                                                            </i>
                                                            <i
                                                                className='far fa-download puntero pr-2'
                                                                style={{color: 'green'}}
                                                                onClick={() => verExamen(row.original.id, false, 2)}
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