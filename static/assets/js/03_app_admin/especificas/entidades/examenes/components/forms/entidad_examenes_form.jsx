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
            element_type,
            examenes_list
        } = this.props;
        return (
            <MyFormTagModal
                onCancel={() => {
                    onCancel();
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
                <div className="m-2">
                    <div className="row">
                        <div className='col-12 col-md-6'>
                            <Field
                                fullWidth={true}
                                name="examen"
                                component={SelectField}
                                hintText="Examen"

                                floatingLabelText="Examen"
                            >
                                {
                                    _.map(examenes_list, e => {
                                        return <MenuItem key={e.id} value={e.id}
                                                         primaryText={e.nombre}/>
                                    })
                                }
                            </Field>
                        </div>
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Valor'
                            name='valor_examen'
                            case='U'/>
                        <MyCheckboxSimple
                            className='col-12'
                            nombre='Activo'
                            name='activo'
                        />
                    </div>
                </div>
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
    dispatch(reset('entidadExamenForm'));
};


Form = reduxForm({
    form: "entidadExamenForm",
    onSubmitSuccess: afterSubmit,
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;