import {
    CREATE_ORDEN,
    DELETE_ORDEN,
    FETCH_ORDENES,
    FETCH_ORDEN,
    CLEAR_ORDENES,
    UPDATE_ORDEN,
} from '../../00_types';

import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethodWithParameters,
    callApiMethodWithParametersPDF
}
    from
        '../../00_general_fuctions'

const current_url_api = 'ordenes';

export function enviarOrdenExamenesEmail(id, tipo_envio, callback = null, callback_error = null) {
    return function (dispatch) {
        let params = new URLSearchParams();
        params.append('tipo_envio', tipo_envio);
        callApiMethodWithParameters(current_url_api, id, 'enviar_email', params, null, callback, callback_error)
    }
}


export function printOrdenExamenes(id, callback = null, callback_error = null) {
    return function (dispatch) {
        callApiMethodWithParametersPDF(current_url_api, id, 'print_resultados', null, null, callback, callback_error)
    }
}



export function printOrdenRecibo(id, callback = null, callback_error = null) {
    return function (dispatch) {
        callApiMethodWithParametersPDF(current_url_api, id, 'print_recibo', null, null, callback, callback_error)
    }
}

export const createOrden = (values, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: CREATE_ORDEN, payload: response})
            };
            createObject(current_url_api, values, dispatches, callback, callback_error)
        }
    }
;
export const deleteOrden = (id, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: DELETE_ORDEN, payload: id})
            };
            deleteObject(current_url_api, id, dispatches, callback, callback_error)
        }
    }
;
export const fetchOrdenes = (callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: FETCH_ORDENES, payload: response})
            };
            fetchList(current_url_api, dispatches, callback, callback_error);
        }
    }
;
export const fetchOrden = (id, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: FETCH_ORDEN, payload: response})
            };
            fetchObject(current_url_api, id, dispatches, callback, callback_error);
        }
    }
;
export const clearOrdenes = () => {
        return (dispatch) => {
            dispatch({type: CLEAR_ORDENES});

        }
    }
;
export const updateOrden = (id, values, callback = null, callback_error = null) => {
        return (dispatch) => {
            const dispatches = (response) => {
                dispatch({type: UPDATE_ORDEN, payload: response})
            };
            updateObject(current_url_api, id, values, dispatches, callback, callback_error)
        }
    }
;