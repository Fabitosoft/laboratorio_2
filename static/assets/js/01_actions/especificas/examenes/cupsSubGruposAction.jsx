import {
    CREATE_CUPS_SUB_GRUPO,
    DELETE_CUPS_SUB_GRUPO,
    FETCH_CUPS_SUB_GRUPOS,
    FETCH_CUPS_SUB_GRUPO,
    CLEAR_CUPS_SUB_GRUPOS,
    UPDATE_CUPS_SUB_GRUPO,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
} from '../../00_general_fuctions'

const current_url_api = 'cups_subgrupos';
export const createCupsSubGrupo = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_CUPS_SUB_GRUPO, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteCupsSubGrupo = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_CUPS_SUB_GRUPO, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchCupsSubGrupos = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_CUPS_SUB_GRUPOS, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchCupsSubGrupo = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_CUPS_SUB_GRUPO, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearCupsSubGrupos = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_CUPS_SUB_GRUPOS});

    }
};
export const updateCupsSubGrupo = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_CUPS_SUB_GRUPO, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};