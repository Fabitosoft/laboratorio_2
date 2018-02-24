import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
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
            grupos_cups_list,
            handleSubmit,
            modal_open,
            element_type
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
                                name="grupo"
                                component={SelectField}
                                hintText="Grupo Cups"
                                floatingLabelText="Grupo Cups"
                            >
                                {
                                    _.map(grupos_cups_list, grupo => {
                                        return <MenuItem key={grupo.id} value={grupo.id}
                                                         primaryText={grupo.nombre}/>
                                    })
                                }
                            </Field>
                        </div>
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Nombre de Grupo'
                            name='nombre'
                            case='U'/>
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Orden'
                            name='orden'
                            case='U'/>
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
    dispatch(reset('subGrupoCupsForm'));
};


Form = reduxForm({
    form: "subGrupoCupsForm",
    onSubmitSuccess: afterSubmit,
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;