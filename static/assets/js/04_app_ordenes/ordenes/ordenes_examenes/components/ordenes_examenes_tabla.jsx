import React, {Fragment} from "react";
import {MyDialogButtonDelete} from '../../../../00_utilities/components/ui/dialog';
import {pesosColombianos} from "../../../../00_utilities/common";

import ReactTable from "react-table";

class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        const {cellInfo} = this.props;
        this.state = ({valor_descuento: cellInfo.original.valor_descuento, editar: false})

    }

    render() {
        const {cellInfo, cambiarDescuentoExamen} = this.props;
        const {editar, valor_descuento} = this.state;
        return (
            <Fragment>
                {
                    editar ?
                        <input
                            onChange={e => {
                                this.setState({valor_descuento: e.target.value})
                            }}
                            onBlur={(e) => {
                                cambiarDescuentoExamen(cellInfo.original, valor_descuento);
                                this.setState({editar: false})
                            }}
                            type="text"
                            value={valor_descuento}
                        /> :
                        <span
                            onClick={() => this.setState({editar: true})}>{pesosColombianos(cellInfo.original.valor_descuento)}</span>
                }
            </Fragment>
        )
    }
}


class Tabla extends React.Component {
    render() {

        const data = this.props.data;
        const {
            updateItem,
            singular_name,
            onDelete,
            onSelectItemEdit,
            permisos_object,
            orden,
            cambiarDescuentoExamen,
            imprimirExamen
        } = this.props;


        return (
            <ReactTable
                data={data.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }
                    return 0;
                })}
                noDataText={`No hay elementos para mostrar tipo ${singular_name}`}
                columns={[
                    {
                        Header: "Caracteristicas",
                        columns: [
                            {
                                Header: "Nro. Examen",
                                accessor: "nro_examen",
                                maxWidth: 100,
                                show: orden.estado === 1,
                                filterable: true
                            },
                            {
                                Header: "Nro. Examen Especial",
                                accessor: "nro_examen_especial",
                                maxWidth: 150,
                                show: orden.estado === 1,
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
                                Header: "$ Examen",
                                accessor: "valor_total",
                                maxWidth: 80,
                                Footer: () => {
                                    return <div>{pesosColombianos(orden.valor_total)}</div>
                                },
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "$ Descuento",
                                accessor: "valor_descuento",
                                maxWidth: 80,
                                Footer: () => {
                                    return <div>{pesosColombianos(orden.valor_descuento)}</div>
                                },
                                Cell: row => {
                                    return (
                                        orden.estado === 0 ?
                                            <EditableCell cellInfo={row}
                                                          cambiarDescuentoExamen={cambiarDescuentoExamen}/> :
                                            pesosColombianos(row.value)
                                    )
                                }
                            },
                            {
                                Header: "$ Final",
                                accessor: "valor_final",
                                maxWidth: 80,
                                Footer: () => {
                                    return <div>{pesosColombianos(orden.valor_final)}</div>
                                },
                                Cell: row => pesosColombianos(row.value)
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
                                Header: "Elimi.",
                                show: (permisos_object.delete && orden.estado === 0),
                                maxWidth: 60,
                                Cell: row =>
                                    <MyDialogButtonDelete
                                        onDelete={() => {
                                            onDelete(row.original)
                                        }}
                                        element_name={row.original.examen_nombre}
                                        element_type={singular_name}
                                    />

                            },
                            {
                                Header: "Impr.",
                                maxWidth: 60,
                                Cell: row => {
                                    return (
                                        <Fragment>
                                            {
                                                row.original.examen_estado === 2 &&
                                                <Fragment>
                                                    <i className='far fa-print puntero pr-3'
                                                       onClick={() => imprimirExamen(row.original.id)}
                                                    >
                                                    </i>
                                                    <i className='far fa-print puntero'
                                                       onClick={() => imprimirExamen(row.original.id, false)}
                                                    >
                                                    </i>
                                                </Fragment>
                                            }
                                        </Fragment>
                                    )
                                }

                            },
                            {
                                Header: "Imp. Obv",
                                accessor: "pdf_examen_encriptado",
                                maxWidth: 90,
                                Cell: row => {
                                    return (
                                        <Fragment>
                                            {
                                                row.value &&
                                                <i style={{color: 'red'}} className='far fa-exclamation-circle'>
                                                </i>
                                            }
                                        </Fragment>
                                    )
                                }

                            },
                        ]
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight tabla-maestra"
            />
        );
    }
}

export default Tabla;