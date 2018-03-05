import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {MyTextFieldSimple, MyCombobox, MyDropdownList} from '../../../../../00_utilities/components/ui/forms/fields';
import {connect} from "react-redux";
import {MyFormTagModal} from '../../../../../00_utilities/components/ui/forms/MyFormTagModal';
import validate from './validate';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busy_paciente: false,
            busy_medico_remitente: false,
            busy_entidad: false,
            paciente: null,
            medico_remitente: null,
            entidad: null
        })
    }

    componentDidMount() {
        const {initialValues} = this.props;
        if (initialValues) {
            const {paciente, medico_remitente, entidad} = initialValues;
            this.setState({paciente, entidad, medico_remitente});
        }
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
            pacientes_list,
            medicos_remitentes_list,
            entidades_list,
        } = this.props;

        const {
            busy_paciente,
            busy_medico_remitente,
            busy_entidad,
            paciente,
            entidad,
            medico_remitente
        } = this.state;
        return (
            <MyFormTagModal
                onCancel={onCancel}
                onSubmit={handleSubmit((values) => {
                    onSubmit({...values, entidad, paciente, medico_remitente, tipo_pago: values.tipo_pago.id})
                })}
                reset={reset}
                initialValues={initialValues}
                submitting={submitting}
                modal_open={modal_open}
                pristine={pristine}
                element_type={singular_name}
            >
                <MyCombobox
                    name='paciente'
                    placeholder='Paciente...'
                    onChange={(a, b) => {
                        if (b.length > 3) {
                            this.setState({busy_paciente: true});
                            this.props.fetchPacientesParametros(b, () => {
                                this.setState({busy_paciente: false});
                            })
                        } else {
                            this.props.clearPacientes();
                        }
                    }}
                    textField='name'
                    valuesField='id'
                    onSelect={p => {
                        this.setState({paciente: p.id})
                    }}
                    data={_.map(pacientes_list, p => {
                        return {id: p.id, name: p.full_name}
                    })}
                    autoFocus={true}
                    busy={busy_paciente}
                />
                <MyCombobox
                    name='medico_remitente'
                    placeholder='Médico Remitente...'
                    onChange={(a, b) => {
                        if (b.length > 3) {
                            this.setState({busy_medico_remitente: true});
                            this.props.fetchMedicosRemitentesXNombres(b, () => {
                                this.setState({busy_medico_remitente: false});
                            })
                        } else {
                            this.props.clearMedicosRemitentes();
                        }
                    }}
                    onSelect={p => {
                        this.setState({medico_remitente: p.id})
                    }}
                    data={_.map(medicos_remitentes_list, p => {
                        return {id: p.id, name: p.full_name}
                    })}
                    busy={busy_medico_remitente}
                />
                <MyCombobox
                    name='entidad'
                    placeholder='Entidad...'
                    onChange={(a, b) => {
                        if (b.length > 3) {
                            this.setState({busy_entidad: true});
                            this.props.fetchEntidadesXParametro(b, () => {
                                this.setState({busy_entidad: false});
                            })
                        } else {
                            this.props.clearEntidades();
                        }
                    }}
                    onSelect={p => {
                        this.setState({entidad: p.id})
                    }}
                    data={_.map(entidades_list, p => {
                        return {id: p.id, name: p.nombre}
                    })}
                    busy={busy_entidad}
                />
                <MyDropdownList
                    dropUp
                    name='tipo_pago'
                    placeholder='Forma de Pago...'
                    data={[
                        {id: 'EFECTIVO', name: 'Efectivo'},
                        {id: 'TARJETA', name: 'Tarjeta'},
                        {id: 'RELACION DE COBRO', name: 'Relación de Cobro'},
                        {id: 'CORTESIA', name: 'Cortesía'},
                    ]}
                    valueField='id'
                    textField='name'
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

function mapPropsToState(state, ownProps) {
    const {item_seleccionado} = ownProps;
    return {
        initialValues: item_seleccionado
    }
}

Form = reduxForm({
    form: "algoForm",
    validate,
    enableReinitialize: true
})(Form);

Form = (connect(mapPropsToState, null)(Form));

export default Form;