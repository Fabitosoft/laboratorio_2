import React, {Fragment, Component} from 'react'
import Tabla from './especialistas_tabla';
import CreateForm from './forms/especialistas_form';
import ListManager from "../../../../../00_utilities/components/CRUDTableManager";
import {
    ESPECIALISTAS as permisos_view,
    USUARIOS as permisos_view_usuarios
} from "../../../../../00_utilities/permisos/types";
import {permisosAdapter} from "../../../../../00_utilities/common";

class BloqueTab extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onChangeFirma = this.onChangeFirma.bind(this);
    }

    onDelete(item, tipo) {
        const nombre = item.full_name;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            noCargando();
            notificarAction(`Se ha eliminado con éxito ${tipo.toLowerCase()} ${nombre}`)
        };
        cargando();
        this.props.deleteEspecialista(item.id, success_callback, notificarErrorAjaxAction)
    }

    onSubmit(item, tipo) {
        const nombre = item.full_name;
        const {cargando, noCargando, notificarAction, notificarErrorAjaxAction} = this.props;
        const success_callback = () => {
            notificarAction(`Se ha ${item.id ? 'actualizado' : 'creado'} con éxito ${tipo.toLowerCase()} ${nombre}`);
            noCargando()
        };
        cargando();
        if (item.id) {
            this.props.updateEspecialista(item.id, item, success_callback, notificarErrorAjaxAction);
        } else {
            this.props.createEspecialista(item, success_callback, notificarErrorAjaxAction);
        }
    }

    onChangeFirma(e, item) {
        const {notificarAction, notificarErrorAjaxAction} = this.props;
        const error_callback = (error) => {
            notificarErrorAjaxAction(error);
        };
        const file = e.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append('firma', file);
            this.props.updateEspecialista(
                item.id,
                formData,
                (especialista) => {
                    this.props.fetchEspecialista(
                        especialista.id,
                        () => notificarAction(`La firma se ha cambiado para ${item.full_name}`),
                        notificarErrorAjaxAction
                    )
                },
                error_callback
            )
        }
    }

    render() {
        const {list, mis_permisos, especialidades_list} = this.props;
        const permisos = permisosAdapter(mis_permisos, permisos_view);
        const permisos_usuario = permisosAdapter(mis_permisos, permisos_view_usuarios);
        return (
            <ListManager permisos={permisos} singular_name='especialista' plural_name='especialistas'>
                {
                    (list_manager_state,
                     onSelectItem,
                     onCancel,
                     handleModalOpen,
                     handleModalClose) => {
                        return (
                            <Fragment>
                                {
                                    list_manager_state.modal_open &&
                                    <CreateForm
                                        setSelectItem={onSelectItem}
                                        especialidades_list={especialidades_list}
                                        onCancel={onCancel}
                                        item_seleccionado={list_manager_state.item_seleccionado}
                                        onSubmit={
                                            (item) => {
                                                this.onSubmit(item, list_manager_state.singular_name);
                                                handleModalClose();
                                            }
                                        }
                                        modal_open={list_manager_state.modal_open}
                                        element_type={`${list_manager_state.singular_name}`}
                                    />
                                }
                                <Tabla
                                    onChangeFirma={this.onChangeFirma}
                                    updateItem={
                                        (item) => this.onSubmit(item, list_manager_state.singular_name)
                                    }
                                    can_make_user_active={permisos_usuario.make_user_active}
                                    data={_.map(list, e => e)}
                                    permisos={permisos}
                                    element_type={`${list_manager_state.singular_name}`}
                                    onDelete={(item) => {
                                        this.onDelete(item, list_manager_state.singular_name);
                                        handleModalClose();
                                    }}
                                    onSelectItemEdit={(item) => {
                                        const {cargando, noCargando, notificarErrorAjaxAction} = this.props;
                                        cargando();
                                        this.props.fetchEspecialista(item.id, () => {
                                                onSelectItem(item);
                                                handleModalOpen();
                                                noCargando();
                                            },
                                            notificarErrorAjaxAction
                                        )
                                    }}
                                />

                            </Fragment>
                        )
                    }
                }
            </ListManager>
        )
    }
}

export default BloqueTab;