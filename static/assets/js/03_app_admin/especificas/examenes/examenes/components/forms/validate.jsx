import {REGEX_SOLO_NUMEROS_DINERO} from "../../../../../../00_utilities/common";

const validate = values => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = 'Requerido';
    }
    if (!values.codigo_cups) {
        errors.codigo_cups = 'Requerido';
    }
    if (!values.tecnica) {
        errors.tecnica = 'Requerido';
    }

    if (!values.unidad_medida) {
        errors.unidad_medida = 'Requerido';
    }

    if (!values.valor_referencia) {
        errors.valor_referencia = 'Requerido';
    }

    if (!values.grupo_cups) {
        errors.grupo_cups = 'Requerido';
    }

    if (!values.nro_plantilla) {
        errors.nro_plantilla = 'Requerido';
    }

    if (!values.subgrupo_cups) {
        errors.subgrupo_cups = 'Requerido';
    }

    if (!values.costo_referencia) {
        errors.costo_referencia = 'Requerido';
    } else if (!REGEX_SOLO_NUMEROS_DINERO.test(values.costo_referencia)) {
        errors.costo_referencia = `Este campo debe de ser sólo unidades monetarias`;
    }
    return errors;
};

export default validate;