import {
    CREATE_ORDEN_EXAMEN,
    DELETE_ORDEN_EXAMEN,
    FETCH_ORDENES_EXAMENES,
    FETCH_ORDEN_EXAMEN,
    CLEAR_ORDENES_EXAMENES,
    UPDATE_ORDEN_EXAMEN,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
} from '../../00_general_fuctions'

const current_url_api = 'ordenes_exames';
export const createOrdenExamen = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_ORDEN_EXAMEN, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteOrdenExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_ORDEN_EXAMEN, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchOrdenesExamenes = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMENES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchOrdenExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDEN_EXAMEN, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearOrdenesExamenes = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_ORDENES_EXAMENES});

    }
};
export const updateOrdenExamen = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};