import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {MyTextFieldSimple, MyCheckboxSimple} from '../../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';

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
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Nombre Entidad'
                            name='nombre'
                            case='U'/>
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Nit'
                            name='nit'
                            case='U'/>
                        <MyTextFieldSimple
                            className="col-12"
                            nombre='Dirección'
                            name='direccion'
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
    dispatch(reset('grupoCupsForm'));
};


Form = reduxForm({
    form: "grupoCupsForm",
    onSubmitSuccess: afterSubmit,
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;