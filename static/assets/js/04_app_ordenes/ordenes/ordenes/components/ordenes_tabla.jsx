import React from "react";
import {MyDialogButtonDelete} from '../../../../00_utilities/components/ui/dialog';
import {IconButtonTableSee} from '../../../../00_utilities/components/ui/icon/iconos';
import {Link} from 'react-router-dom'

import ReactTable from "react-table";
import {fechaFormatoUno} from "../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {

        const data = _.orderBy(this.props.data, ['nro_orden', 'fecha_ingreso'], ['desc', 'desc']);
        const {
            updateItem,
            singular_name,
            onDelete,
            onSelectItemEdit,
            permisos_object
        } = this.props;


        return (
            <ReactTable
                data={data}
                noDataText={`No hay elementos para mostrar tipo ${singular_name}`}
                columns={[
                    {
                        Header: "Caracteristicas",
                        columns: [
                            {
                                Header: "Nro. Registro",
                                accessor: "id",
                                maxWidth: 100,
                                filterable: true,
                            },
                            {
                                Header: "Nro. Orden",
                                accessor: "nro_orden",
                                maxWidth: 100,
                                filterable: true,
                            },
                            {
                                Header: "Paciente",
                                accessor: "paciente_nombre",
                                maxWidth: 250,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Fecha",
                                maxWidth: 150,
                                Cell: row =>
                                    <div>{row.original.fecha_ingreso ? fechaFormatoUno(row.original.fecha_ingreso) : fechaFormatoUno(row.original.created)}</div>
                            },
                            {
                                Header: "Médico Remitente",
                                accessor: "medico_remitente_nombre",
                                maxWidth: 250,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Entidad",
                                accessor: "entidad_nombre",
                                maxWidth: 250,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Estado",
                                accessor: "estado_nombre",
                                maxWidth: 150,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                        ]
                    },
                    {
                        Header: "Opciones",
                        columns: [
                            {
                                Header: "Elimi.",
                                accessor: 'estado',
                                show: permisos_object.delete,
                                maxWidth: 60,
                                Cell: row => <div>
                                    {
                                        row.value === 0 &&
                                        <MyDialogButtonDelete
                                            onDelete={() => {
                                                onDelete(row.original)
                                            }}
                                            element_name={row.original.nro_orden.toString()}
                                            element_type='Orden'
                                        />
                                    }
                                </div>

                            },
                            {
                                Header: "Ver",
                                show: permisos_object.detail,
                                maxWidth: 60,
                                Cell: row =>
                                    <Link to={`/app/ordenes/ordenes/detail/${row.original.id}`}>
                                        <IconButtonTableSee/>
                                    </Link>

                            }
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