import React, {Component, Fragment} from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {
    MyTextFieldSimple,
    MyCheckboxSimple,
    MyCombobox
} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';

const modelStyle = {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
};

class Form extends Component {
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
            valores,
            grupos_cups_list,
        } = this.props;

        const grupos_cups_disponibles = _.map(_.pickBy(grupos_cups_list, grupo => grupo.mis_subgrupos.length > 0), g => g);
        const grupo_cups = valores && valores.grupo_cups ? valores.grupo_cups : null;
        return (
            <MyFormTagModal
                modelStyle={modelStyle}
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
            >
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Nombre'
                    name='nombre'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-8"
                    nombre='Nombre Corto'
                    name='nombre_corto'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-4"
                    nombre='Código Cups'
                    name='codigo_cups'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-8 col-lg-7"
                    nombre='Valor de Referencia'
                    name='valor_referencia'
                    multiline={true}
                    rows={6}
                    case='U'/>
                <div className="col-12 col-md-4 col-lg-5">
                    <div className="row">
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Uni. Medida'
                            name='unidad_medida'
                        />
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Costo Referencia'
                            name='costo_referencia'
                            case='U'/>
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Técnica'
                            name='tecnica'
                            case='U'/>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <MyCombobox
                            className='col-12 col-md-4'
                            nombre='Grupo Cups'
                            name='grupo_cups'
                            data={_.map(grupos_cups_disponibles, e => {
                                return {
                                    value: e.id,
                                    primaryText: e.nombre
                                }
                            })}
                            textField='primaryText'
                            valuesField='value'
                            placeholder='Subgrupo Cups...'
                        />

                        {
                            grupo_cups &&
                            <MyCombobox
                                className='col-12 col-md-8'
                                name="subgrupo_cups"
                                nombre='Subgrupo Cups'
                                data={grupos_cups_list[grupo_cups].mis_subgrupos.map(e => {
                                    return {
                                        value: e.id,
                                        primaryText: e.nombre
                                    }
                                })}
                                textField='primaryText'
                                valuesField='value'
                                placeholder='Subgrupo Cups...'
                            />
                        }
                    </div>
                </div>
                <MyCheckboxSimple className="col-12" nombre="Multifirma" name='multifirma'/>
                <MyCheckboxSimple className="col-12" nombre="Especial" name='especial'/>
                {
                    valores &&
                    valores.especial &&
                    <MyCombobox
                        className='col-12 col-md-6'
                        name="nro_plantilla"
                        nombre='Tipo Plantilla'
                        data={[
                            {value: 1, primaryText: 'Biopsia'},
                            {value: 2, primaryText: 'Citología'}
                        ]}
                        textField='primaryText'
                        valuesField='value'
                        placeholder='Tipo Plantilla...'

                    />
                }
            </MyFormTagModal>
        )
    }
}

const selector = formValueSelector('examenForm')

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        valores: selector(state, 'especial', 'grupo_cups'),
        initialValues: item_seleccionado
    }
}

Form = reduxForm({
    form: "examenForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;