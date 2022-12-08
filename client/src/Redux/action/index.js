import {GET_DOGS, GET_DOG_DETAIL, GET_TEMPERAMENTS, CREATE_DOG, GET_DOG_NAME, FILTER_ORIGIN, FILTER_TEMPERAMENT, ORDER_NAME, ORDER_WEIGHT} from './action-types';

export const getDogs = () => {
    return async function(dispatch){
        return await fetch('https://dogs-pi-production-c755.up.railway.app/dogs')
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
        return await fetch(`https://dogs-pi-production-c755.up.railway.app/dogs/${id}`)
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
        return await fetch('https://dogs-pi-production-c755.up.railway.app/dogs', {
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
        return await fetch('https://dogs-pi-production-c755.up.railway.app/temperament')
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
        return await fetch(`https://dogs-pi-production-c755.up.railway.app/dogs/?name=${name}`)
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: GET_DOG_NAME,
                payload: response
            })
        })
    }
};

export const filterOrigin = (origin) => {
    return async function(dispatch) {
        return await fetch(`https://dogs-pi-production-c755.up.railway.app/dogs/filter/${origin}`)
        .then(r => r.json())
        .then(response => {
            dispatch({
                type: FILTER_ORIGIN,
                payload: response
            })
        })
    }
};

export const filterTemps = (temp) => {
    return {
                type: FILTER_TEMPERAMENT,
                payload: temp
            }
};

export const orderName = (order) => {
    return {
        type: ORDER_NAME,
        payload: order
    }
};

export const orderWeight = (order) => {
    return {
        type: ORDER_WEIGHT,
        payload: order
    }
};
