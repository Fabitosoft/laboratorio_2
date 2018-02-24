import {
    FETCH_MIS_PERMISOS,
    FETCH_PERMISOS,
    FETCH_PERMISO,
    CLEAR_PERMISOS,
    FETCH_OTRO_USUARIO_PERMISOS,
    UPDATE_PERMISO
} from '../../00_types';

import {
    fetchList,
    updateObject,
    fetchObject,
    fetchListWithParameter
} from '../../00_general_fuctions'

const current_url_api = 'permisos';

export function fetchMisPermisos(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/mis_permisos';
        const FULL_URL = `${current_url_api}${SUB_URL}`;
        const dispatches = (response) => {
            dispatch({type: FETCH_MIS_PERMISOS, payload: response})
        };
        fetchList(FULL_URL, dispatches, callback, callback_error);
    }
}

export function fetchPermisosActivos(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/permisos_activos';
        const FULL_URL = `${current_url_api}${SUB_URL}`;
        const dispatches = (response) => {
            dispatch({type: FETCH_PERMISOS, payload: response})
        };
        fetchList(FULL_URL, dispatches, callback, callback_error);
    }
}

export function fetchOtroUsuarioPermisos(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/permiso_x_usuario/?user_id=${id}`;
        const FULL_URL = `${current_url_api}${SUB_URL}`;
        const dispatches = (response) => {
            dispatch({type: FETCH_OTRO_USUARIO_PERMISOS, payload: response})
        };
        fetchListWithParameter(FULL_URL, dispatches, callback, callback_error);
    }
}

export const fetchPermisos = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_PERMISOS, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};

export const updatePermiso = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_PERMISO, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};

export const fetchPermiso = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_PERMISO, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};

export const clearPermisos = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_PERMISOS});

    }
};