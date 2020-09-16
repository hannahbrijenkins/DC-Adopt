const router = require('express').Router();

const petsRoutes = require('./pets.js');
const postRoutes = require(`./post-routes`);
const userRoutes = require(`./user-routes`);

router.use('/pets', petsRoutes);
router.use(`/post`, postRoutes);
router.use(`/users`, userRoutes);

module.exports = router;