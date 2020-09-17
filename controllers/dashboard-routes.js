const router = require(`express`).Router();
const { Pet, User, SavedPet } = require(`../models`);
const withAuth = require(`../utils/auth`);

router.get(`/`, withAuth, (req, res) => {
    Pet.findAll({
        where: {
            user_id: req.session.userId
        },
        attributes: [
            "id",
            "name",
            "age",
            "info",
            "breed",
            "health_conditions",
            "sex",
            "neutered",
            "house_trained",
            "adoption_fee",
            "user_id",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
        .then(dbPetData => {
            const pets = dbPetData.map(pet => pet.get({ plain: true }));
            res.render(`dashboard`, { pets, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


router.get(`/edit/:id`, withAuth, (req, res) => {
    Pet.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "name",
            "age",
            "info",
            "breed",
            "health_conditions",
            "sex",
            "neutered",
            "house_trained",
            "adoption_fee",
            "user_id",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
        .then(dbPetData => {
            if(!dbPetData) {
                res.status(404).json({ message: `No Pet Was Found With This ID` });
                return;
            }

            const pet = dbPetData.get({ plain: true });

            res.render(`editpost`, {
                pet,
                loggedIn: req.session.userId
            });
        });
});

module.exports = router;