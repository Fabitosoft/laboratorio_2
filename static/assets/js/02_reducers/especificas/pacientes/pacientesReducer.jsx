import {
    CREATE_PACIENTE,
    DELETE_PACIENTE,
    FETCH_PACIENTES,
    FETCH_PACIENTE,
    CLEAR_PACIENTES,
    UPDATE_PACIENTE,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_PACIENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_PACIENTE:
            return _.omit(state, action.payload);
            break;
        case FETCH_PACIENTES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_PACIENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_PACIENTES:
            return {};
            break;
        case UPDATE_PACIENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}