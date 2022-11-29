import {GET_DOGS, GET_DOG_DETAIL, GET_TEMPERAMENTS, CREATE_DOG} from '../action/action-types';

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
        default:
            return state
    }
};

export default rootReducer;