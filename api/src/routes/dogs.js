const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {apiDogs, dbDogs, getAllDogs, getByName, getById} = require('../controllers/controllers');

const router = Router();

router.post('/', async (req, res) => {
    const {name, img, breed_group, weight, height, life_span, temperament, origin} = req.body;
    try {
        const newDog = await Dog.create({name, img, breed_group, weight, height, life_span, origin})
        await newDog.addTemperament(temperament)
        return res.status(201).json({message: 'Dog created!'})
    }
    catch(err) {
        return res.status(404).send('Something went wrong')
    }
})

router.get('/', async (req, res) => {
    const { name } = req.query;
    try{
        if(name) {
            const dog = await getByName(name);
            res.status(200).send(dog);
        } else {
            const dogs = await getAllDogs();
            res.status(200).send(dogs);
        }
    } catch(err) {
        res.status(404).send({message: err.message});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const found = await getById(id);
        res.status(200).send(found);
    }
    catch(err) {
        res.status(404).send('Dog not Found!')
    }
})

module.exports = router;