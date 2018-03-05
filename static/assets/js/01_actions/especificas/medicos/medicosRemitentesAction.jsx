import {
    CREATE_MEDICO_REMITENTE,
    DELETE_MEDICO_REMITENTE,
    FETCH_MEDICOS_REMITENTES,
    FETCH_MEDICO_REMITENTE,
    CLEAR_MEDICOS_REMITENTES,
    UPDATE_MEDICO_REMITENTE,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    fetchListWithParameter
} from '../../00_general_fuctions'

const current_url_api = 'medicos_remitentes';
export const fetchMedicosRemitentesXNombres = (nombre, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_MEDICOS_REMITENTES, payload: response})
        };
        fetchListWithParameter(`${current_url_api}/buscar_nombre/?parametro=${nombre}`, dispatches, callback, callback_error);
    }
};
export const createMedicoRemitente = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_MEDICO_REMITENTE, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteMedicoRemitente = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_MEDICO_REMITENTE, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchMedicosRemitentes = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_MEDICOS_REMITENTES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchMedicoRemitente = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_MEDICO_REMITENTE, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearMedicosRemitentes = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_MEDICOS_REMITENTES});

    }
};
export const updateMedicoRemitente = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_MEDICO_REMITENTE, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};