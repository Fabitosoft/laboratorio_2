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
import RelacionCobroForm from '../components/forms/orden_cobro_form';

class List extends Component {
    constructor(props) {
        super(props);
        this.printRelacionCobro = this.printRelacionCobro.bind(this);
    }

    printRelacionCobro(entidad_id, fecha_inicial, fecha_final, tipo_pago, nro_relacion_cobro) {
        const {
            noCargando,
            cargando,
            printRelacionCobroEntidad,
            notificarErrorAjaxAction
        } = this.props;
        const success_callback = (response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            PrinJs(url);
            noCargando();
        };
        cargando();
        printRelacionCobroEntidad(
            entidad_id,
            fecha_inicial,
            fecha_final,
            tipo_pago,
            nro_relacion_cobro,
            success_callback,
            notificarErrorAjaxAction
        );
    }

    render() {
        return (
            <div>
                <RelacionCobroForm {...this.props} printRelacionCobro={this.printRelacionCobro}/>
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