const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;
const router = Router();

router.get('/', async (req, res) => {
    const apiTemps = await axios.get(`https://api.thedogapi.com/v1/breeds?limit=40&api_key=${API_KEY}`);
    const allTemps = apiTemps.data.map(t => t.temperament);
    const temps = allTemps.toString().split(',');
    temps.forEach(e => {
        let curr = e.trim();
        Temperament.findOrCreate({
            where: { name: curr}
        })
    })
    const dbTemps = await Temperament.findAll();
    res.status(200).send(dbTemps);

});

module.exports = router;