const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {apiDogs, dbDogs, getAllDogs, getByName, getById} = require('../controllers/controllers');

const router = Router();

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