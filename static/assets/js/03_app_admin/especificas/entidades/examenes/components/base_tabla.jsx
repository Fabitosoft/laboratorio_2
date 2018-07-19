import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import {MyDialogButtonDelete} from '../../../../../00_utilities/components/ui/dialog';
import {IconButtonTableEdit, IconButtonTableSee} from '../../../../../00_utilities/components/ui/icon/iconos';
import ReactTable from "react-table";
import {pesosColombianos} from "../../../../../00_utilities/common";

class Tabla extends React.Component {
    render() {

        const data = _.orderBy(this.props.data,['examen_nombre'],['asc']);
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
                                Header: "Examen",
                                accessor: "examen_nombre",
                                maxWidth: 300,
                                filterable: true,
                                filterMethod: (filter, row) => {
                                    return row[filter.id].includes(filter.value.toUpperCase())
                                }
                            },
                            {
                                Header: "Valor",
                                accessor: "valor_examen",
                                maxWidth: 100,
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "Valor Base",
                                accessor: "examen_costo_referencia",
                                maxWidth: 100,
                                Cell: row => pesosColombianos(row.value)
                            },
                            {
                                Header: "Diferencia",
                                maxWidth: 100,
                                Cell: row => {
                                    const diferencia = Number(row.original.valor_examen - row.original.examen_costo_referencia);
                                    return (
                                        <div><span>{pesosColombianos(diferencia)} </span>
                                            {diferencia < 0 &&
                                            <i className='fas fa-exclamation-circle' style={{color: 'red'}}>

                                            </i>}
                                        </div>
                                    )
                                }
                            },
                            {
                                Header: "Activo",
                                accessor: "activo",
                                maxWidth: 100,
                                Cell: row => (
                                    <Checkbox
                                        checked={row.value}
                                        onChange={() => updateItem({...row.original, activo: !row.value})}
                                    />
                                )
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
                                        element_name={row.original.examen_nombre}
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