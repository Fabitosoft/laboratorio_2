import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple} from '../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';
import asyncValidate from './asyncValidate';

const afterSubmit = (result, dispatch) => {
    dispatch(reset('usuarioForm'));
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
                element_type='Usuario'
            >
                <MyTextFieldSimple
                    className="col-12 col-md-4"
                    nombre='Nombre de Usuario'
                    name='username'
                    case='L'/>
                <MyTextFieldSimple
                    className="col-12 col-md-8"
                    nombre='Correo Electrónico'
                    name='email'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-6"
                    nombre='Nombres'
                    name='first_name'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12 col-md-6"
                    nombre='Apellidos'
                    name='last_name'
                    case='U'/>
                {!initialValues &&
                <Fragment>
                    <MyTextFieldSimple
                        type='password'
                        className="col-12 col-md-6"
                        nombre='Contraseña'
                        name='password'
                    />
                    <MyTextFieldSimple
                        type='password'
                        className="col-12 col-md-6"
                        nombre='Comprobación de contraseña'
                        name='password2'
                    />
                </Fragment>
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


Form = reduxForm({
    form: "usuarioForm",
    onSubmitSuccess: afterSubmit,
    validate,
    asyncValidate,
    asyncBlurFields: ['username'],
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;