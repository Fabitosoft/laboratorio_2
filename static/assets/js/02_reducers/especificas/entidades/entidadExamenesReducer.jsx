import {
    CREATE_ENTIDAD_EXAMEN,
    DELETE_ENTIDAD_EXAMEN,
    FETCH_ENTIDADES_EXAMENES,
    FETCH_ENTIDAD_EXAMEN,
    CLEAR_ENTIDADES_EXAMENES,
    UPDATE_ENTIDAD_EXAMEN,
} from '../../../01_actions/00_types';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {

        case CREATE_ENTIDAD_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;

        case DELETE_ENTIDAD_EXAMEN:
            return _.omit(state, action.payload);
            break;

        case FETCH_ENTIDADES_EXAMENES:
            return _.mapKeys(action.payload.data, 'id');
            break;

        case FETCH_ENTIDAD_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;

        case CLEAR_ENTIDADES_EXAMENES:
            return {};
            break;

        case UPDATE_ENTIDAD_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
            break;

        default:
            return state;
    }
}
