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
            cargando,
            printEstadisticaCitologia,
            notificarErrorAjaxAction
        } = this.props;
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            PrinJs(url);
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