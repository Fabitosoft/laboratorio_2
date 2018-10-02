import {
    CREATE_ENTIDAD,
    DELETE_ENTIDAD,
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    CLEAR_ENTIDADES,
    UPDATE_ENTIDAD,
} from '../../00_types';
import {
    fetchList,
    updateObject,
    fetchObject,
    deleteObject,
    createObject,
    callApiMethod,
    fetchListWithParameter,
    callApiMethodWithParametersPDF,
} from '../../00_general_fuctions'

const current_url_api = 'entidades';

export function printRelacionCobroEntidad(id, fecha_ini, fecha_fin, tipo_pago, nro_relacion_cobro, callback = null, callback_error = null) {
    return function (dispatch) {
        let params = new URLSearchParams();
        params.append('fecha_ini', fecha_ini);
        params.append('fecha_fin', fecha_fin);
        params.append('tipo_pago', tipo_pago);
        params.append('nro_relacion_cobro', nro_relacion_cobro);
        callApiMethodWithParametersPDF(current_url_api, id, 'print_relacion_cobro', params, null, callback, callback_error)
    }
}

export const fetchEntidadesXParametro = (parametro, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDADES, payload: response})
        };
        fetchListWithParameter(`${current_url_api}/buscar_x_parametro/?parametro=${parametro}`, dispatches, callback, callback_error);
    }
};
export const createEntidad = (values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: CREATE_ENTIDAD, payload: response})
        };
        createObject(current_url_api, values, dispatches, callback, callback_error)
    }
};
export const deleteEntidad = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: DELETE_ENTIDAD, payload: id})
        };
        deleteObject(current_url_api, id, dispatches, callback, callback_error)
    }
};
export const fetchEntidades = (callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDADES, payload: response})
        };
        fetchList(current_url_api, dispatches, callback, callback_error);
    }
};
export const fetchEntidad = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDAD, payload: response})
        };
        fetchObject(current_url_api, id, dispatches, callback, callback_error);
    }
};
export const clearEntidades = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_ENTIDADES});

    }
};
export const updateEntidad = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ENTIDAD, payload: response})
        };
        updateObject(current_url_api, id, values, dispatches, callback, callback_error)
    }
};

export function createEntidadUsuario(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDAD, payload: response})
        };
        callApiMethod(current_url_api, id, 'crear_usuario', dispatches, callback, callback_error);
    }
}