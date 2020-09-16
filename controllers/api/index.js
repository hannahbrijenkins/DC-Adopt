const router = require('express').Router();

const petsRoutes = require('./pets.js');
const userRoutes = require(`./user-routes`);

router.use('/pets', petsRoutes);
router.use(`/users`, userRoutes);

module.exports = router;