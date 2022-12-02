import {GET_DOGS, GET_DOG_DETAIL, GET_TEMPERAMENTS, CREATE_DOG, GET_DOG_NAME} from './action-types';

export const getDogs = () => {
    return async function(dispatch){
        return await fetch('http://localhost:3001/dogs')
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_DOGS,
                payload: response
            })
        })
    }
};

export const getDetail = (id) => {
    return async function(dispatch){
        return await fetch(`http://localhost:3001/dogs/${id}`)
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_DOG_DETAIL,
                payload: response
            })
        })
    }
};

export const createDog = (payload) => {
    return async function(dispatch){
        return await fetch('http://localhost:3001/dogs', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            dispatch({
                type: CREATE_DOG,
                payload: response
            })
        })
    }
};

export const getTemperaments = () => {
    return async function(dispatch){
        return await fetch('http://localhost:3001/temperaments')
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response
            })
        })
    }
};

export const getName = (name) => {
    return async function(dispatch) {
        return await fetch(`http://localhost:3001/dogs/?name=${name}`)
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_DOG_NAME,
                payload: response
            })
        })
    }
}