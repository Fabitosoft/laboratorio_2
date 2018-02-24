import {
    CREATE_ESPECIALISTA,
    DELETE_ESPECIALISTA,
    FETCH_ESPECIALISTAS,
    FETCH_ESPECIALISTA,
    CLEAR_ESPECIALISTAS,
    UPDATE_ESPECIALISTA,
} from '../../00_types';

import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
}
    from
        '../../00_general_fuctions'

const current_url_api = 'especialistas';

export const createEspecialista = (values, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: CREATE_ESPECIALISTA, payload: response})
            };
            createObject(current_url_api, values, dispatches, callback, callback_error)
        }
    }
;
export const deleteEspecialista = (id, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: DELETE_ESPECIALISTA, payload: id})
            };
            deleteObject(current_url_api, id, dispatches, callback, callback_error)
        }
    }
;
export const fetchEspecialistas = (callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: FETCH_ESPECIALISTAS, payload: response})
            };
            fetchList(current_url_api, dispatches, callback, callback_error);
        }
    }
;
export const fetchEspecialista = (id, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: FETCH_ESPECIALISTA, payload: response})
            };
            fetchObject(current_url_api, id, dispatches, callback, callback_error);
        }
    }
;
export const clearEspecialistas = () => {
        return (dispatch) => {
            dispatch({type: CLEAR_ESPECIALISTAS});

        }
    }
;
export const updateEspecialista = (id, values, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: UPDATE_ESPECIALISTA, payload: response})
            };
            updateObject(current_url_api, id, values, dispatches, callback, callback_error)
        }
    }
;