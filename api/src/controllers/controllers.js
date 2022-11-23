const { Sequelize } = require('sequelize');
const axios = require('axios');
const {Dog, Temperament} = require('../db');
const { API_KEY } = process.env;

const apiDogs = async () => {
    let apiDogs = [];
    let apiArray;
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
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

const dbDogs = async () => {
    const dbDogs = await Dog.findAll();
    return dbDogs;    
};

const getAllDogs = async () => {
    const api = await apiDogs();
    const db = await dbDogs();
    return api && db ? api.concat(db) : api
};

const getByName = async (name) => {
    try {
        const dbDog = await Dog.findOne({
            where: {name: name}, include: Temperament
        })
        if(!dbDog){
            const apiDog = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            console.log(apiDog)
            return {
                id: apiDog.data[0].id,
                name: apiDog.data[0].name,
                breed_group: apiDog.data[0].breed_group || 'None',
                weight: apiDog.data[0].weight.metric,
                height: apiDog.data[0].height.metric,
                life_span: apiDog.data[0].life_span,
                temperament: apiDog.data[0].temperament,
                origin: apiDog.data[0].origin || 'Unknown',
                img: `https://cdn2.thedogapi.com/images/${apiDog.data[0].reference_image_id}.jpg`
            }
        }
        else {
            return dbDog;
        }
    }
    catch(err){
        throw new Error('Could not find that dog!')
    }
};

const getById = async (id) => {
    try{
        if(id.length < 3){
            const api = await apiDogs();
            const found = api.filter(d => d.id === parseInt(id))
            console.log(found)
            return found[0];
        }
        else{
            const db = await Dog.findByPk(id, {include: Temperament})
            return db;
        }
    }
    catch(err){
        throw new Error('Could not find that dog!')
    }
};



module.exports = {
    apiDogs,
    dbDogs,
    getAllDogs,
    getByName,
    getById

}