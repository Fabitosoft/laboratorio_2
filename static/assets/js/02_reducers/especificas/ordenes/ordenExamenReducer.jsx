import {
    CREATE_ORDEN_EXAMEN,
    DELETE_ORDEN_EXAMEN,
    FETCH_ORDENES_EXAMENES,
    FETCH_ORDEN_EXAMEN,
    CLEAR_ORDENES_EXAMENES,
    UPDATE_ORDEN_EXAMEN,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_ORDEN_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_ORDEN_EXAMEN:
            return _.omit(state, action.payload);
            break;
        case FETCH_ORDENES_EXAMENES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_ORDEN_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_ORDENES_EXAMENES:
            return {};
            break;
        case UPDATE_ORDEN_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}