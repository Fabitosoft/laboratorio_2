import {
    CREATE_PACIENTE,
    DELETE_PACIENTE,
    FETCH_PACIENTES,
    FETCH_PACIENTE,
    CLEAR_PACIENTES,
    UPDATE_PACIENTE,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
} from '../../00_general_fuctions'

const current_url_api = 'pacientes';
export const createPaciente = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_PACIENTE, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deletePaciente = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_PACIENTE, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchPacientes = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_PACIENTES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchPaciente = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_PACIENTE, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearPacientes = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_PACIENTES});

    }
};
export const updatePaciente = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_PACIENTE, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};