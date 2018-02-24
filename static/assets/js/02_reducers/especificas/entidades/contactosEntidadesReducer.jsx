import {
    CREATE_CONTACTO_ENTIDAD,
    DELETE_CONTACTO_ENTIDAD,
    FETCH_CONTACTOS_ENTIDADES,
    FETCH_CONTACTO_ENTIDAD,
    CLEAR_CONTACTOS_ENTIDADES,
    UPDATE_CONTACTO_ENTIDAD,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_CONTACTO_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case DELETE_CONTACTO_ENTIDAD:
            return _.omit(state, action.payload);
            break;
        case FETCH_CONTACTOS_ENTIDADES:
            return _.mapKeys(action.payload.data, 'id');
            break;
        case FETCH_CONTACTO_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        case CLEAR_CONTACTOS_ENTIDADES:
            return {};
            break;
        case UPDATE_CONTACTO_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;
        default:
            return state;
    }
}