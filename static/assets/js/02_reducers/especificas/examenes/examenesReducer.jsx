import {
    CREATE_EXAMEN,
    DELETE_EXAMEN,
    FETCH_EXAMENES,
    FETCH_EXAMEN,
    CLEAR_EXAMENES,
    UPDATE_EXAMEN,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_EXAMEN:
            return _.omit(state, action.payload);
            break;
        case FETCH_EXAMENES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_EXAMENES:
            return {};
            break;
        case UPDATE_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}