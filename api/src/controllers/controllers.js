const { Sequelize } = require('sequelize');
const axios = require('axios');
const {Dog, Temperament} = require('../db');
const { API_KEY } = process.env;

const apiDogs = async () => {
    let apiDogs = [];
    let apiArray;
    await axios.get(`https://api.thedogapi.com/v1/breeds?limit=40&api_key=${API_KEY}`)
    .then(async response => {
        apiArray = response.data;
        console.log(response)
        
            apiDogs = apiArray?.map(dog => {
                return {
                    id: dog.id,
                    name: dog.name,
                    breed_group: dog.breed_group || null,
                    img: dog.image.url,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    origin: dog.origin || null
                }
            })
            console.log(apiDogs);
        })
        .catch(err => console.log(err.message))
        return apiDogs;
    };

const getByName = async (name) => {
    const searchedDog = {};
    await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
    .then(response => {
        return {
            id: response.data.id,
            name: response.data.name,
            breed_group: response.data.breed_group || null,
            img: response.data.image.url,
            height: response.data.height.metric,
            weight: response.data.weight.metric,
            life_span: response.data.life_span,
            origin: response.data.origin || null
        }
    })
    .catch(err => console.log(err.message))
};



module.exports = {
    apiDogs,
    getByName

}