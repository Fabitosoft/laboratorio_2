import {
    CREATE_EXAMEN,
    DELETE_EXAMEN,
    FETCH_EXAMENES,
    FETCH_EXAMEN,
    CLEAR_EXAMENES,
    UPDATE_EXAMEN,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters, fetchListWithParameter
} from '../../00_general_fuctions'

const current_url_api = 'examenes';
export const createExamen = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_EXAMEN, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_EXAMEN, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchExamenes_por_entidad = (entidad_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_EXAMENES, payload: response})
        };
        fetchListWithParameter(`${current_url_api}/examenes_entidad/?id_entidad=${entidad_id}`, dispatches, callback, callback_error);
    }
};
export const fetchExamenes = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_EXAMENES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_EXAMEN, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearExamenes = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_EXAMENES});

    }
};
export const updateExamen = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_EXAMEN, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};