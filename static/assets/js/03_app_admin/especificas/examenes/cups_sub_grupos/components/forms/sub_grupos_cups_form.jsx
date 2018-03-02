import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple, MySelectField} from '../../../../../../00_utilities/components/ui/forms/fields';
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
            singular_name,
            grupos_cups_list,
        } = this.props;
        return (
            <MyFormTagModal
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
            >
                <MySelectField
                    className='col-12'
                    nombre='Grupo Cups'
                    name='grupo'
                    options={
                        _.map(grupos_cups_list, e => {
                            return {
                                value: e.id,
                                primaryText: e.nombre
                            }
                        })
                    }
                />
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Nombre de Sub Grupo'
                    name='nombre'
                    case='U'/>
                <MyTextFieldSimple
                    className="col-12"
                    nombre='Orden'
                    name='orden'
                    case='U'/>
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
    form: "subGrupoCupsForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;