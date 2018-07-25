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
    callApiMethod,
    callApiMethodWithParameters,
    fetchListWithParameter,
    callApiMethodWithParametersPDF
} from '../../00_general_fuctions'

const current_url_api = 'ordenes_examenes';
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
export const fetchOrdenesExamenes_por_entidad = (entidad_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMENES, payload: response})
        };
        fetchListWithParameter(`${current_url_api}/por_entidad/?entidad_id=${entidad_id}`, dispatches, callback, callback_error);
    }
};
export const fetchOrdenesExamenes_por_orden = (orden_id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMENES, payload: response})
        };
        fetchListWithParameter(`${current_url_api}/por_orden/?orden_id=${orden_id}`, dispatches, callback, callback_error);
    }
};
export const fetchOrdenesExamenesxEstado = (estado, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMENES, payload: response})
        };
        fetchList(`${current_url_api}/${estado}`, dispatches, callback, callback_error);
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

export const uploadPDFExamenOrdenExamen = (id, values, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        callApiMethodWithParametersPDF(current_url_api, id, 'upload_pdf_examen', values, dispatches, callback, callback_error)
    }
};

export const eliminarPDFExamenOrdenExamen = (id, callback = null, callback_error = null) => {
    return (dispatch) => {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        callApiMethod(current_url_api, id, 'eliminar_pdf_examen', dispatches, callback, callback_error)
    }
};

export function firmarOrdenExamen(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        callApiMethod(current_url_api, id, 'firmar', dispatches, callback, callback_error)
    }
}

export function firmarComoOrdenExamen(id, especialista_id, callback = null, callback_error = null) {
    return function (dispatch) {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        let params = new URLSearchParams();
        params.append('id_especialista', especialista_id);
        callApiMethodWithParameters(current_url_api, id, 'firmar', params, dispatches, callback, callback_error)
    }
}

export function quitarFirmaOrdenExamen(id, id_firma, callback = null, callback_error = null) {
    return function (dispatch) {
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        let params = new URLSearchParams();
        params.append('id_firma', id_firma);
        callApiMethodWithParameters(current_url_api, id, 'quitar_firma', params, dispatches, callback, callback_error)
    }
}