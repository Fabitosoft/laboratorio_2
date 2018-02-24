import {
    CREATE_ENTIDAD,
    DELETE_ENTIDAD,
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    CLEAR_ENTIDADES,
    UPDATE_ENTIDAD,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_ENTIDAD:
            return _.omit(state, action.payload);
            break;
        case FETCH_ENTIDADES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_ENTIDADES:
            return {};
            break;
        case UPDATE_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}