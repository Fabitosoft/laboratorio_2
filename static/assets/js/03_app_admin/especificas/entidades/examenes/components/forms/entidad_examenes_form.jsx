import React, {Component, Fragment} from 'react';
import {reduxForm, reset} from 'redux-form';
import {
    MyTextFieldSimple,
    MyCheckboxSimple,
    MySelectField
} from '../../../../../../00_utilities/components/ui/forms/fields';
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
                <MySelectField
                    className='col-12'
                    nombre='Examen'
                    name='examen'
                    options={
                        _.map(examenes_list, e => {
                            return {
                                value: e.id,
                                primaryText: e.nombre
                            }
                        })
                    }
                />
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