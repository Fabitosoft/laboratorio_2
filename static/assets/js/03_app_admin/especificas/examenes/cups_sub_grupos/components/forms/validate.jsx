import {REGEX_SOLO_NUMEROS} from "../../../../../../00_utilities/common";

const validate = values => {
    const errors = {};

    const requiredFields = [
        'nombre',
        'grupo',
        'orden',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });

    if (values.orden && values.orden.length < 0) {
        errors.orden = `Debe ser un número mayor a 0`;
    } else if (!REGEX_SOLO_NUMEROS.test(values.orden)) {
        errors.orden = `Debe ser un número`;
    }
    return errors;
};

export default validate;