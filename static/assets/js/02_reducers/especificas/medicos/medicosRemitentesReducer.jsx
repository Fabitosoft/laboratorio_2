import {
    CREATE_MEDICO_REMITENTE,
    DELETE_MEDICO_REMITENTE,
    FETCH_MEDICOS_REMITENTES,
    FETCH_MEDICO_REMITENTE,
    CLEAR_MEDICOS_REMITENTES,
    UPDATE_MEDICO_REMITENTE,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_MEDICO_REMITENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_MEDICO_REMITENTE:
            return _.omit(state, action.payload);
            break;
        case FETCH_MEDICOS_REMITENTES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_MEDICO_REMITENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_MEDICOS_REMITENTES:
            return {};
            break;
        case UPDATE_MEDICO_REMITENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}