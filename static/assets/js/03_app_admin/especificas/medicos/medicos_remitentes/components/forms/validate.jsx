const validate = values => {
    const errors = {};
    const requiredFields = [
        'nombres',
        'apellidos',
        'especialidad'
    ];
    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });
    return errors;
};

export default validate;