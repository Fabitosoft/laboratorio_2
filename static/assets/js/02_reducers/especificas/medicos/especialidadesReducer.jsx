import {
    CREATE_ESPECIALIDAD,
    DELETE_ESPECIALIDAD,
    FETCH_ESPECIALIDADES,
    FETCH_ESPECIALIDAD,
    CLEAR_ESPECIALIDADES,
    UPDATE_ESPECIALIDAD,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_ESPECIALIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_ESPECIALIDAD:
            return _.omit(state, action.payload);
            break;
        case FETCH_ESPECIALIDADES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_ESPECIALIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_ESPECIALIDADES:
            return {};
            break;
        case UPDATE_ESPECIALIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}