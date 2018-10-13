import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../01_actions/01_index";
import CargarDatos from "../../../../00_utilities/components/system/cargar_datos";
import {permisosAdapter} from "../../../../00_utilities/common";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    ORDENES_EXAMENES as bloque_1_permisos
} from "../../../../00_utilities/permisos/types";
import PrinJs from "print-js";
import FormEstadisticaCitologiaCervical from '../components/forms/estadistica_citologia_cervical_form';

class List extends Component {
    constructor(props) {
        super(props);
        this.printReportes = this.printReportes.bind(this);
    }

    printReportes(entidad_id = null, fecha_inicial, fecha_final) {
        const {
            noCargando,
            entidades_list,
            cargando,
            printEstadisticaCitologia,
            notificarErrorAjaxAction
        } = this.props;
        const success_callback = (response) => {
            const file = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            const nombre_entidad = entidad_id ? `_${entidades_list[entidad_id].nombre}` : '';
            const nombre_archivo = `Esta_Cito_Cerv${nombre_entidad.substring(0,20)}_desde_${fecha_inicial}_a_${fecha_final}`;
            link.href = url;
            link.setAttribute('download', nombre_archivo);
            document.body.appendChild(link);
            link.click();
            noCargando();
        };
        cargando();
        printEstadisticaCitologia(
            entidad_id,
            fecha_inicial,
            fecha_final,
            success_callback,
            notificarErrorAjaxAction
        );
    }

    render() {
        return (
            <div>
                <FormEstadisticaCitologiaCervical
                    {...this.props}
                    printReportes={this.printReportes}
                />
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        ordenes_examenes: state.ordenes_examenes,
        entidades_list: state.entidades,
        ordenes: state.ordenes,
        mis_permisos: state.mis_permisos,
    }
}

export default connect(mapPropsToState, actions)(List)