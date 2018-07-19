import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import {MyDialogButtonDelete} from '../../../../../00_utilities/components/ui/dialog';
import {IconButtonTableEdit, IconButtonTableSee} from '../../../../../00_utilities/components/ui/icon/iconos';
import {Link} from 'react-router-dom'

import ReactTable from "react-table";

class Tabla extends React.Component {
    render() {

        const data = _.orderBy(this.props.data, ['nombre', 'nombre_segundo', 'apellido', 'apellido_segundo'], ['asc', 'asc', 'asc', 'asc']);
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
                                Header: "Nombre",
                                accessor: "nombre",
                                maxWidth: 300,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    const nombre = `${row._original.nombre} ${row._original.nombre_segundo} ${row._original.apellido} ${row._original.apellido_segundo}`;
                                    return nombre.includes(filter.value.toUpperCase())
                                },
                                Cell: row => `${row.original.nombre} ${row.original.nombre_segundo} ${row.original.apellido} ${row.original.apellido_segundo}`.trim()
                            },
                            {
                                Header: "Tipo Doc.",
                                accessor: "tipo_documento",
                                maxWidth: 80,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Nro. Doc.",
                                accessor: "nro_identificacion",
                                maxWidth: 120,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].toString().includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Grup. Sang.",
                                accessor: "grupo_sanguineo",
                                maxWidth: 100,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].toString().includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Email",
                                accessor: "email",
                                maxWidth: 400,
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
                                show: permisos_object.delete,
                                maxWidth: 60,
                                Cell: row =>
                                    <MyDialogButtonDelete
                                        onDelete={() => {
                                            onDelete(row.original)
                                        }}
                                        element_name={row.original.full_name}
                                        element_type={singular_name}
                                    />

                            },
                            {
                                Header: "Editar",
                                show: permisos_object.change,
                                maxWidth: 60,
                                Cell: row =>
                                    <IconButtonTableEdit
                                        onClick={() => {
                                            onSelectItemEdit(row.original);
                                        }}/>

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