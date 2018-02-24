import React from "react";
import Checkbox from 'material-ui/Checkbox';
import {MyDialogButtonDelete} from '../../../../../00_utilities/components/ui/dialog';
import {IconButtonTableEdit} from '../../../../../00_utilities/components/ui/icon/iconos';
import {pesosColombianos} from '../../../../../00_utilities/common';

import ReactTable from "react-table";

class Tabla extends React.Component {
    render() {

        const data = this.props.data;
        const {
            onDelete,
            permisos,
            onSelectItemEdit,
            updateItem,
            element_type
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
                                            onCheck={() => updateItem({...row.original, activo: !row.value})}
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

                                }
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