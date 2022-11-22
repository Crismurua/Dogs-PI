const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {apiDogs, getByName} = require('../controllers/controllers');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try{
        if(name) {
            const dog = await getByName(name);
            res.status(200).send(dog);
        } else {
            const dogs = await apiDogs();
            res.status(200).send(dogs);
        }
    } catch(err) {
        res.status(404).send({message: err.message});
    }
})

module.exports = router;