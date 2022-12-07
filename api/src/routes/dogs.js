const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const {apiDogs, dbDogs, getAllDogs, getByName, getById} = require('../controllers/controllers');
const multer = require('multer');
const path = require('path');

const router = Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.post('/', fileUpload, async (req, res) => {
    const {name, breed_group, weight, height, life_span, temperaments, origin} = req.body;
    const img = req.file
    console.log(req.file)


    if(!name || !weight || !height || !life_span || !temperaments) return res.status(404).send('Data missing');
    try {
        const newDog = await Dog.create({name, img, breed_group, weight, height, life_span, origin});
        await newDog.addTemperaments(temperaments)
        console.log(newDog)
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
});

router.get('/filter/:origin', async (req, res) => {
    const {origin} = req.params;
    if(!origin) return
    try{
        console.log(origin)
        if(origin === 'database'){
            const db = await dbDogs();
            return res.status(200).send(db);
        }
        if(origin === 'api'){
            const api = await apiDogs();
            return res.status(200).send(api);
        }
    }catch(err){
        res.status(404).send('Not Found')
    }

})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, img, breed_group, weight, height, life_span, temperaments, origin} = req.body;
    try{
        let currentDog = await getById(id)
        currentDog?.update(
            {name, img, breed_group, weight, height, life_span, origin}
        )
        const arrayPromise = await currentDog.upsert(temperaments)
        await Promise.all(arrayPromise)
        console.log(currentDog)
        res.status(200).json(currentDog)
    }
    catch(err){
        res.status(400).send('Something went wrong!')
    }
    
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await Dog.destroy({where: {id}})
        res.status(200).send(`Dog id ${id} successfully destroyed!`)
    }
    catch(err) {
        res.status(400).send('Something went wrong!')
    }
})

module.exports = router;