import React from "react";
import Checkbox from 'material-ui/Checkbox';
import {MyDialogButtonDelete} from '../../../../../00_utilities/components/ui/dialog';
import {IconButtonTableEdit} from '../../../../../00_utilities/components/ui/icon/iconos';

import ReactTable from "react-table";

class Tabla extends React.Component {
    render() {

        const data = _.orderBy(this.props.data, ['nombre'], ['asc']);
        const {
            singular_name,
            updateItem,
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
                        Header: "Características",
                        columns: [
                            {
                                Header: "Código Cups",
                                accessor: "codigo_cups",
                                maxWidth: 80,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].toString().includes(filter.value.toLowerCase())
                                }
                            },
                            {
                                Header: "Nombre",
                                accessor: "nombre",
                                maxWidth: 400,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Unid. Medida",
                                accessor: "unidad_medida",
                                maxWidth: 80,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Grupo Cups",
                                accessor: "grupo_cups_nombre",
                                maxWidth: 200,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Subgrupo Cups",
                                accessor: "subgrupo_cups_nombre",
                                maxWidth: 200,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Multifirma",
                                accessor: "multifirma",
                                maxWidth: 80,
                                Cell: row => (
                                    <Checkbox
                                        checked={row.value}
                                        onCheck={() => updateItem({...row.original, multifirma: !row.value})}
                                    />
                                )
                            },
                            {
                                Header: "No Email",
                                accessor: "no_email",
                                maxWidth: 80,
                                Cell: row => (
                                    <Checkbox
                                        checked={row.value}
                                        onCheck={() => updateItem({...row.original, no_email: !row.value})}
                                    />
                                )
                            },
                            {
                                Header: "Especial",
                                accessor: "especial",
                                maxWidth: 60,
                                Cell: row => {
                                    return (row.value ? <i className='far fa-check-circle'></i> : <span></span>)
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
                                        element_name={row.original.nombre}
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