import {GET_DOGS, GET_DOG_DETAIL, GET_TEMPERAMENTS, CREATE_DOG, GET_DOG_NAME, FILTER_ORIGIN, FILTER_TEMPERAMENT, ORDER_NAME, ORDER_WEIGHT} from '../action/action-types';

const initialState = {
    dogs: [],
    dogDetail: {},
    temperaments: [],

};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,

            }
        case FILTER_ORIGIN:
            return {
                ...state,
                dogs: action.payload
            }
        case FILTER_TEMPERAMENT:
            let current = [...state.dogs];
            return {
                ...state,
                dogs: current.filter(d => d.temperament?.includes(action.payload) || d.temperaments?.includes(action.payload)
                )
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload,
            }
        case CREATE_DOG:
            return {
                ...state,
                dogs: [...state.dogs, {...action.payload}],
            }
        case GET_DOG_NAME:
            return {
                ...state,
                dogs: [action.payload]
            }
        case ORDER_NAME:
                let curr = [...state.dogs]
            return {
                ...state,
                dogs: curr.sort((a,b) => {
                    if (a.name < b.name) {  return action.payload === 'a-z' ? -1 : 1; }
                    if (a.name > b.name) {  return action.payload === 'z-a' ? -1 : 1;}
                    return 0;
                })
            }
        case ORDER_WEIGHT:
            let order = [...state.dogs];
            return {
                ...state,
                dogs: order.sort((a,b) => {
                    if (a.weight < b.weight) {  return action.payload === 'light' ? -1 : 1; }
                    if (a.weight > b.weight) {  return action.payload === 'heavy' ? -1 : 1;}
                    return 0;
                })
            }
        default:
            return state
    }
};

export default rootReducer;