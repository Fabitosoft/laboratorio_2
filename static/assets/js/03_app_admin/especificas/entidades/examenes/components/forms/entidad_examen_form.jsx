import React, {Component, Fragment} from 'react';
import {reduxForm} from 'redux-form';
import {
    MyTextFieldSimple,
    MyCheckboxSimple,
    MyCombobox
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
            singular_name,
            examenes_list,
            object_list
        } = this.props;
        const examenes_existentes = _.map(object_list, e => e.examen);
        const examenes_para_adicionar = _.pickBy(examenes_list, e => !examenes_existentes.includes(e.id));
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
                <MyCombobox
                    className='col-12'
                    nombre='Examen'
                    name='examen'
                    valueField='id'
                    textField='nombre'
                    data={
                        _.map(_.orderBy(examenes_para_adicionar, ['nombre'], ['asc']), e => {
                            return {
                                id: e.id,
                                nombre: e.nombre
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

Form = reduxForm({
    form: "examenEntidadForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;