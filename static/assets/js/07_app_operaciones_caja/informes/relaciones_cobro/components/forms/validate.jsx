const validate = values => {
    const errors = {};

    const requiredFields = [
        'fecha_inicial',
        'fecha_final',
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