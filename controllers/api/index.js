const router = require('express').Router();

const petsRoutes = require('./pets.js');

router.use('/pets', petsRoutes);

module.exports = router;