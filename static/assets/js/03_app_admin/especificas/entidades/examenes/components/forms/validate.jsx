import {REGEX_SOLO_NUMEROS_DINERO} from '../../../../../../00_utilities/common';

const validate = values => {
    const errors = {};

    const requiredFields = [
        'nombre',
        'examen',
        'valor_examen',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });

    if (values.valor_examen && values.valor_examen <= 0) {
        errors.valor_examen = 'El valor debe ser un número positivo';
    } else if (values.valor_examen && !REGEX_SOLO_NUMEROS_DINERO.test(values.valor_examen)) {
        errors.valor_examen = 'Debe ser dinero';
    }
    return errors;
};

export default validate;