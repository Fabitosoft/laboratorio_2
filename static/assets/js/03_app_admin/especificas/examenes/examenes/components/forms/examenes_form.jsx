import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import {
    SelectField
} from 'redux-form-material-ui'
import {Field} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            grupo_cups_seleccionado: null,
            es_especial: false
        });
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
            grupos_cups,
            element_type
        } = this.props;
        const {grupo_cups_seleccionado, es_especial} = this.state;
        const grupos_cups_disponibles = _.map(_.pickBy(grupos_cups, grupo => grupo.mis_subgrupos.length > 0), g => g);
        const grupo_cups = grupo_cups_seleccionado ? grupo_cups_seleccionado : initialValues ? initialValues.grupo_cups : null;
        return (
            <MyFormTagModal
                onCancel={() => {
                    onCancel();
                    this.setState({grupo_cups_seleccionado: null, es_especial: false});
                    reset()
                }}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={element_type}
            >
                <MyTextFieldSimple
                    className="col-12 col-md-8"
                    nombre='Nombre'
                    name='nombre'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-4"
                    nombre='Código Cups'
                    name='codigo_cups'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-6"
                    nombre='Nombre Corto'
                    name='nombre_corto'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-6"
                    nombre='Técnica'
                    name='tecnica'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-8"
                    nombre='Valor de Referencia'
                    name='valor_referencia'
                    multiLine={true}
                    rows={6}
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-4"
                    nombre='Uni. Medida'
                    name='unidad_medida'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-6"
                    nombre='Costo Referencia'
                    name='costo_referencia'
                    case='U'/>
                <div className='col-12 col-md-6'>
                    <Field
                        fullWidth={true}
                        name="grupo_cups"
                        component={SelectField}
                        hintText="Grupo Cups"
                        floatingLabelText="Grupo Cups"
                        onChange={(a, b, c) => this.setState({grupo_cups_seleccionado: b})}
                    >
                        {grupos_cups_disponibles.map(grupo => {
                            return <MenuItem key={grupo.id} value={grupo.id} primaryText={grupo.nombre}/>
                        })}
                    </Field>
                </div>
                {
                    grupo_cups &&
                    <div className='col-12 col-md-6'>
                        <Field
                            fullWidth={true}
                            name="subgrupo_cups"
                            component={SelectField}
                            hintText="Subgrupo Cups"
                            floatingLabelText="Subgrupo Cups"
                        >
                            {
                                grupos_cups[grupo_cups].mis_subgrupos.map(subgrupo => {
                                    return <MenuItem key={subgrupo.id} value={subgrupo.id}
                                                     primaryText={subgrupo.nombre}/>
                                })
                            }
                        </Field>
                    </div>
                }
                <MyCheckboxSimple className="col-12" nombre="Multifirma" name='multifirma'/>
                <MyCheckboxSimple className="col-12" nombre="Especial" name='especial'
                                  onClick={(e) => this.setState({es_especial: e.target.checked})}/>
                {((initialValues && initialValues.especial) || es_especial) &&
                <div className='col-md-12'>
                    <Field
                        component={SelectField}
                        hintText="Tipo Plantilla"
                        floatingLabelText="Tipo Plantilla"
                        name='nro_plantilla'
                        case='U'>
                        <MenuItem value={1} primaryText='Biopsia'/>
                        <MenuItem value={2} primaryText='Citología'/>
                    </Field>
                </div>
                }
            </MyFormTagModal>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        initialValues: item_seleccionado
    }
}

const afterSubmit = (result, dispatch) => {
    dispatch(reset('examenesForm'));
};


Form = reduxForm({
    form: "examenesForm",
    onSubmitSuccess: afterSubmit,
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;