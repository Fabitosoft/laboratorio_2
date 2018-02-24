import React from "react";
import Checkbox from 'material-ui/Checkbox';
import {MyDialogButtonDelete} from '../../../../../00_utilities/components/ui/dialog';
import {IconButtonTableEdit, IconButtonTableSee} from '../../../../../00_utilities/components/ui/icon/iconos';
import {Link} from 'react-router-dom'

import ReactTable from "react-table";

class Tabla extends React.Component {
    render() {

        const data = this.props.data;
        const {
            onDelete,
            onSelectItemEdit,
            permisos,
            element_type,
            link_detail,
            updateItem
        } = this.props;


        return (
            <div>
                <ReactTable
                    data={data}
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
                                    Header: "Especial",
                                    accessor: "especial",
                                    maxWidth: 60,
                                    Cell: row => {
                                        return (row.value ? <i className='far fa-check-circle'></i> : <span></span>)
                                    }
                                }
                                ,
                            ]
                        },
                        {
                            Header: "Opciones",
                            columns: [
                                {
                                    Header: "Elimi.",
                                    show: permisos.delete,
                                    maxWidth: 60,
                                    Cell: row =>
                                        <MyDialogButtonDelete
                                            onDelete={() => {
                                                onDelete(row.original)
                                            }}
                                            element_name={row.original.nombre}
                                            element_type={element_type}
                                        />

                                },
                                {
                                    Header: "Editar",
                                    show: permisos.change,
                                    maxWidth: 60,
                                    Cell: row =>
                                        <IconButtonTableEdit
                                            onClick={() => {
                                                onSelectItemEdit(row.original);
                                            }}/>

                                },
                                // {
                                //     Header: "Ver",
                                //     show: permisos.detail,
                                //     maxWidth: 60,
                                //     Cell: row =>
                                //         <Link to={`${link_detail}${row.original.id}`}>
                                //             <IconButtonTableSee/>
                                //         </Link>
                                //
                                // }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight tabla-maestra"
                />
            </div>
        );
    }
}

export default Tabla;