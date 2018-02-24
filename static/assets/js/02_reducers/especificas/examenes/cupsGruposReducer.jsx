import {
    CREATE_CUPS_GRUPO,
    DELETE_CUPS_GRUPO,
    FETCH_CUPS_GRUPOS,
    FETCH_CUPS_GRUPO,
    CLEAR_CUPS_GRUPOS,
    UPDATE_CUPS_GRUPO,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_CUPS_GRUPO:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_CUPS_GRUPO:
            return _.omit(state, action.payload);
            break;
        case FETCH_CUPS_GRUPOS:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_CUPS_GRUPO:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_CUPS_GRUPOS:
            return {};
            break;
        case UPDATE_CUPS_GRUPO:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}