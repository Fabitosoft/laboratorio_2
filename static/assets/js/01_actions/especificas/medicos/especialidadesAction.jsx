import {
    CREATE_ESPECIALIDAD,
    DELETE_ESPECIALIDAD,
    FETCH_ESPECIALIDADES,
    FETCH_ESPECIALIDAD,
    CLEAR_ESPECIALIDADES,
    UPDATE_ESPECIALIDAD,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
} from '../../00_general_fuctions'

const current_url_api = 'especialidades';
export const createEspecialidad = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_ESPECIALIDAD, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteEspecialidad = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_ESPECIALIDAD, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchEspecialidades = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALIDADES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchEspecialidad = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALIDAD, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearEspecialidades = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_ESPECIALIDADES});

    }
};
export const updateEspecialidad = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ESPECIALIDAD, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};