import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {formValueSelector} from 'redux-form';
import {
    MyTextFieldSimple,
    MySelect,
    MySelectAsync
} from '../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';


class Form extends Component {
    constructor(props) {
        super(props);
        this.loadOptionsPacientes = this.loadOptionsPacientes.bind(this);
        this.loadOptionsEntidades = this.loadOptionsEntidades.bind(this);
        this.loadOptionsMedicosRemitentes = this.loadOptionsMedicosRemitentes.bind(this);
    }

    loadOptionsPacientes(input, callback) {
        const {notificarErrorAjaxAction, esta_cargando, cargando, noCargando} = this.props;
        const {
            fetchPacientesParametros,
            pacientes_list
        } = this.props;
        if (input && input.length > 4) {
            cargando();
            fetchPacientesParametros(input, () => noCargando(), notificarErrorAjaxAction);
        }
        const resultado = _.map(_.orderBy(pacientes_list, ['full_name'], ['asc']), e => {
            return {id: e.id, label: `${e.full_name} - ${e.tipo_documento} ${e.nro_identificacion}`}
        });
        const data = {
            options: resultado ? resultado : [],
            complete: esta_cargando,
        };
        callback(null, data);
    }

    loadOptionsEntidades(input, callback) {
        const {notificarErrorAjaxAction, esta_cargando, cargando, noCargando} = this.props;
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

    loadOptionsMedicosRemitentes(input, callback) {
        const {notificarErrorAjaxAction, esta_cargando, cargando, noCargando} = this.props;
        const {
            fetchMedicosRemitentesXNombres,
            medicos_remitentes_list
        } = this.props;
        if (input && input.length > 4) {
            cargando();
            fetchMedicosRemitentesXNombres(input, () => noCargando(), notificarErrorAjaxAction);
        }
        const resultado = _.map(_.orderBy(medicos_remitentes_list, ['full_name'], ['asc']), e => e);
        const data = {
            options: resultado ? resultado : [],
            complete: esta_cargando,
        };
        callback(null, data);
    }

    render() {
        const {
            pristine,
            submitting,
            reset,
            initialValues,
            onSubmit,
            onCancel,
            handleSubmit,
            modal_open,
            singular_name,
        } = this.props;
        return (
            <MyFormTagModal
                onCancel={onCancel}
                onSubmit={handleSubmit((values) => {
                    onSubmit({...values, tipo_pago: values.tipo_pago.id})
                })}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
            >
                <MySelectAsync
                    className='col-12'
                    valueKey="id"
                    labelKey="label"
                    name='paciente'
                    nombre='Paciente'
                    loadOptions={this.loadOptionsPacientes}
                />
                <MySelectAsync
                    className='col-12'
                    valueKey="id"
                    labelKey="nombre"
                    name='entidad'
                    nombre='Entidad'
                    loadOptions={this.loadOptionsEntidades}
                />

                <MySelectAsync
                    className='col-12'
                    valueKey="id"
                    labelKey="full_name"
                    name='medico_remitente'
                    nombre='Medico Remitente'
                    loadOptions={this.loadOptionsMedicosRemitentes}
                />
                <MySelect
                    name='tipo_pago'
                    nombre='Formas de Pago...'
                    data={[
                        {value: 'EFECTIVO', label: 'Efectivo'},
                        {value: 'TARJETA', label: 'Tarjeta'},
                        {value: 'RELACION DE COBRO', label: 'Relación de Cobro'},
                        {value: 'CORTESIA', label: 'Cortesía'},
                    ]}
                />
                <MyTextFieldSimple
                    name='nombre_contacto_alternativo'
                    nombre='Nombre de contacto'
                    className='col-12'
                />
                <MyTextFieldSimple
                    name='numero_contacto_alternativo'
                    nombre='Número de contacto'
                    className='col-12'
                />
                <MyTextFieldSimple
                    name='direccion_contacto_alternativo'
                    nombre='Dirección de contacto'
                    className='col-12'
                />
            </MyFormTagModal>
        )
    }
}

const selector = formValueSelector('ordenenForm');

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        valores: selector(state, 'first', 'second'),
        initialValues: item_seleccionado
    }
}

Form = reduxForm({
    form: "ordenenForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;