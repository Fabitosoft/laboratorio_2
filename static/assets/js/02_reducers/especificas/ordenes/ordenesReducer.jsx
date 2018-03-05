import {
    CREATE_ORDEN,
    DELETE_ORDEN,
    FETCH_ORDENES,
    FETCH_ORDEN,
    CLEAR_ORDENES,
    UPDATE_ORDEN,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_ORDEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_ORDEN:
            return _.omit(state, action.payload);
            break;
        case FETCH_ORDENES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_ORDEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_ORDENES:
            return {};
            break;
        case UPDATE_ORDEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}