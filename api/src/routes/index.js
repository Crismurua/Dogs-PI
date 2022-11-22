const { Router } = require('express');
const dogs = require('./dogs.js');
const temperaments = require('./temperaments.js');

const router = Router();

router.use('/dogs', dogs);
router.use('/temperaments', temperaments);


module.exports = router;
