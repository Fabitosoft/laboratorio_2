import React from "react";
import {MyDialogButtonDelete} from '../../../../../00_utilities/components/ui/dialog';
import {IconButtonTableEdit,} from '../../../../../00_utilities/components/ui/icon/iconos';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import ReactTable from "react-table";

const styles = {
    button: {
        margin: 0,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

class Tabla extends React.Component {
    render() {

        const data = this.props.data;
        const {
            onDelete,
            onSelectItemEdit,
            permisos,
            element_type,
            onChangeFirma,
            updateItem,
            can_make_user_active
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
                                    Header: "Nombre",
                                    accessor: "full_name",
                                    maxWidth: 280,
                                    filterable: true,
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].includes(filter.value.toUpperCase())
                                    }
                                },
                                {
                                    Header: "Nro. Doc.",
                                    maxWidth: 120,
                                    filterable: true,
                                    accessor: 'nro_identificacion',
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].toString().includes(filter.value.toUpperCase())
                                    },
                                    Cell: row => {
                                        return `${row.original.tipo_documento} ${row.original.nro_identificacion}`
                                    },
                                },
                                {
                                    Header: "Grup. Sang.",
                                    accessor: "grupo_sanguineo",
                                    maxWidth: 80,
                                    filterable: true,
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].toString().includes(filter.value.toUpperCase())
                                    }
                                },
                                {
                                    Header: "Especialidad",
                                    accessor: "especialidad_nombre",
                                    maxWidth: 140,
                                    filterable: true,
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].includes(filter.value.toUpperCase())
                                    }
                                },
                                {
                                    Header: "Email",
                                    accessor: "email",
                                    maxWidth: 280,
                                    filterable: true,
                                    filterMethod: (filter, row) => {
                                        return row[filter.id].includes(filter.value.toUpperCase())
                                    }
                                },
                                {
                                    Header: "Firma",
                                    accessor: 'firma_url',
                                    maxWidth: 280,
                                    Cell: row => {
                                        return (
                                            <div>
                                                {row.value && <a href={row.value} target="_blank">
                                                    <img width={100} src={row.value} alt=""/>
                                                </a>}
                                                <RaisedButton
                                                    label={row.value ? 'Cambiar' : 'Subir'}
                                                    labelPosition="before"
                                                    style={styles.button}
                                                    containerElement="label"
                                                >
                                                    <input type="file"
                                                           onChange={(e) => {
                                                               onChangeFirma(e, row.original)
                                                           }}
                                                           style={styles.exampleImageInput}
                                                           accept=".jpg, .jpeg, .png"/>
                                                </RaisedButton>
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
                                    Header: "Elimi.",
                                    show: permisos.delete,
                                    maxWidth: 40,
                                    Cell: row =>
                                        <MyDialogButtonDelete
                                            onDelete={() => {
                                                onDelete(row.original)
                                            }}
                                            element_name={row.original.full_name}
                                            element_type={element_type}
                                        />

                                },
                                {
                                    Header: "Editar",
                                    show: permisos.change,
                                    maxWidth: 45,
                                    Cell: row =>
                                        <IconButtonTableEdit
                                            onClick={() => {
                                                onSelectItemEdit(row.original);
                                            }}/>

                                },
                                {
                                    Header: "Activo",
                                    accessor: 'is_active',
                                    show: can_make_user_active,
                                    maxWidth: 45,
                                    Cell: row => (
                                        <Checkbox
                                            checked={row.value}
                                            onCheck={() => updateItem({...row.original, is_active: !row.value})}
                                        />
                                    )

                                },
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