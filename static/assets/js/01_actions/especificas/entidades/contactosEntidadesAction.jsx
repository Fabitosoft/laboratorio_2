import {
    CREATE_CONTACTO_ENTIDAD,
    DELETE_CONTACTO_ENTIDAD,
    FETCH_CONTACTOS_ENTIDADES,
    FETCH_CONTACTO_ENTIDAD,
    CLEAR_CONTACTOS_ENTIDADES,
    UPDATE_CONTACTO_ENTIDAD,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters
} from '../../00_general_fuctions'

const current_url_api = 'contacto_entidades';
export const createContactoEntidad = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_CONTACTO_ENTIDAD, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteContactoEntidad = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_CONTACTO_ENTIDAD, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchContactosEntidades = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_CONTACTOS_ENTIDADES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchContactoEntidad = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_CONTACTO_ENTIDAD, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearContactosEntidades = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_CONTACTOS_ENTIDADES});

    }
};
export const updateContactoEntidad = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_CONTACTO_ENTIDAD, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};