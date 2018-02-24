import {
    CREATE_ENTIDAD_EXAMEN,
    DELETE_ENTIDAD_EXAMEN,
    FETCH_ENTIDADES_EXAMENES,
    FETCH_ENTIDAD_EXAMEN,
    CLEAR_ENTIDADES_EXAMENES,
    UPDATE_ENTIDAD_EXAMEN,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
} from '../../00_general_fuctions'

const current_url_api = 'entidad_examenes';
export const createEntidadExamen = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_ENTIDAD_EXAMEN, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteEntidadExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_ENTIDAD_EXAMEN, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchEntidadesExamenes = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDADES_EXAMENES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchEntidadExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDAD_EXAMEN, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearEntidadesExamenes = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_ENTIDADES_EXAMENES});

    }
};
export const updateEntidadExamen = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ENTIDAD_EXAMEN, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};