const router = require(`express`).Router();
const { User, Pet } = require(`../models`);

router.get(`/`, (req,res) => {
    Pet.findAll({
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
                attributes: [`username`, 'email']
            }
        ]
    })
        .then(dbPetData => {
            const pets = dbPetData.map(pet => pet.get({ plain: true }));
            res.render(`homepage`, {
                pets,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get(`/login`, (req, res) => {
    if(req.session.loggedIn) {
        res.redirect(`/`);
        return;
    }

    res.render(`login`);
});

router.get(`/signup`, (req, res) => {
    if(req.session.loggedIn) {
        res.redirect(`/`);
        return;
    }

    res.render(`signup`);
});

router.get(`/newpet`, (req, res) => {
    res.render(`pet-form`, {
        loggedIn: req.session.loggedIn
    });
});

router.get(`/pets/:id`, (req, res) => {
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
                attributes: [`username`, 'email']
            }
        ]
    })
    .then(dbPetData => {
        if(!dbPetData) {
            res.status(404).json({ message: `No Pet Was Found With This ID` });
            return;
        }

        const pet = dbPetData.get({ plain: true });

        res.render(`single-post`, {
            pet,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;