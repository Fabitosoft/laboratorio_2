import React from "react";
import {MyDialogButtonDelete} from '../../../../00_utilities/components/ui/dialog';
import {IconButtonTableSee} from '../../../../00_utilities/components/ui/icon/iconos';
import {Link} from 'react-router-dom'

import ReactTable from "react-table";
import {fechaFormatoUno} from "../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {

        const data = _.orderBy(this.props.data, ['id'], ['desc']);
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
                                accessor: "created",
                                maxWidth: 150,
                                Cell: row => <div>{fechaFormatoUno(row.value)}</div>
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
                        ]
                    },
                    {
                        Header: "Opciones",
                        columns: [
                            // {
                            //     Header: "Activo",
                            //     accessor: "is_active",
                            //     show: permisos_object.make_user_active,
                            //     maxWidth: 60,
                            //     Cell: row => (
                            //         <Checkbox
                            //             checked={row.value}
                            //             onChange={() => updateItem({...row.original, is_active: !row.value})}
                            //         />
                            //     )
                            // },
                            {
                                Header: "Elimi.",
                                show: permisos_object.delete,
                                maxWidth: 60,
                                Cell: row =>
                                    <MyDialogButtonDelete
                                        onDelete={() => {
                                            onDelete(row.original)
                                        }}
                                        element_name={row.original.username}
                                        element_type={singular_name}
                                    />

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