const validate = values => {
    const errors = {};

    const requiredFields = [
        'paciente',
        'entidad',
        'tipo_pago',
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });
    return errors;
};

export default validate;