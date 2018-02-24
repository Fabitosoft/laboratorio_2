import {REGEX_SOLO_NUMEROS} from "../../../../../../00_utilities/common";

const validate = values => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = 'Requerido';
    }
    if (!values.orden) {
        errors.orden = 'Requerido';
    } else if (values.orden <= 0) {
        errors.orden = 'Debe ser mayor a 0';
    } else if (!REGEX_SOLO_NUMEROS.test(values.orden)) {
        errors.orden = 'Debe ser un número';
    }
    return errors;
};

export default validate;