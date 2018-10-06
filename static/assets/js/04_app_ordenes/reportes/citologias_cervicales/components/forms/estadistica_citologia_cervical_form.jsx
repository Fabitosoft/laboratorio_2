import React, {Component} from 'react';
import {
    MyDateTimePickerField,
    MySelectAsync,
} from '../../../../../00_utilities/components/ui/forms/fields';
import {reduxForm} from "redux-form";
import {FlatIconModal} from '../../../../../00_utilities/components/ui/icon/iconos_base';
import validate from './validate'
import moment from "moment-timezone";

class FormEstadisticaCitologiaCervical extends Component {
    constructor(props) {
        super(props);
        this.loadOptionsEntidades = this.loadOptionsEntidades.bind(this);
    }

    loadOptionsEntidades(input, callback) {
        const {
            notificarErrorAjaxAction,
            esta_cargando,
            cargando,
            noCargando
        } = this.props;
        const {
            fetchEntidadesXParametro,
            entidades_list
        } = this.props;
        if (input && input.length > 4) {
            cargando();
            fetchEntidadesXParametro(input, () => noCargando(), notificarErrorAjaxAction);
        }
        const resultado = _.map(_.orderBy(entidades_list, ['nombre'], ['asc']), e => e);
        const data = {
            options: resultado ? resultado : [],
            complete: esta_cargando,
        };
        callback(null, data);
    }

    render() {
        const {
            handleSubmit,
            printReportes
        } = this.props;
        return (
            <form onSubmit={handleSubmit((v) => {
                const fecha_inicial = moment(v.fecha_inicial).format('YYYY-MM-DD');
                const fecha_final = moment(v.fecha_final).format('YYYY-MM-DD');
                printReportes(
                    v.entidad,
                    fecha_inicial,
                    fecha_final
                );
            })}>
                <div className='row'>
                    <MyDateTimePickerField
                        nombre='Fecha Inicial'
                        className='col-12 col-md-4'
                        name='fecha_inicial'
                    />
                    <MyDateTimePickerField
                        nombre='Fecha Final'
                        className='col-12 col-md-4'
                        name='fecha_final'
                    />
                    <MySelectAsync
                        className='col-12 col-md-8'
                        valueKey="id"
                        labelKey="nombre"
                        name='entidad'
                        nombre='Entidad'
                        loadOptions={this.loadOptionsEntidades}
                    />
                    <FlatIconModal
                        text="Consultar"
                        type='submit'
                    />
                </div>
            </form>
        )
    }
}

FormEstadisticaCitologiaCervical = reduxForm({
    form: "estadisticaCitologiaCervicalForm",
    validate,
})(FormEstadisticaCitologiaCervical);

export default FormEstadisticaCitologiaCervical;