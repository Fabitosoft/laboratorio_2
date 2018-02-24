import {
    CREATE_ESPECIALISTA,
    DELETE_ESPECIALISTA,
    FETCH_ESPECIALISTAS,
    FETCH_ESPECIALISTA,
    CLEAR_ESPECIALISTAS,
    UPDATE_ESPECIALISTA,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_ESPECIALISTA:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_ESPECIALISTA:
            return _.omit(state, action.payload);
            break;
        case FETCH_ESPECIALISTAS:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_ESPECIALISTA:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_ESPECIALISTAS:
            return {};
            break;
        case UPDATE_ESPECIALISTA:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}