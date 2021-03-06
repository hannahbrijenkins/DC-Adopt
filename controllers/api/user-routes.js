const router = require("express").Router();
const { User, Pet, SavedPet } = require("../../models");

router.get("/", (req, res) => {
    User.findAll({
        attributes: {
            exclude: ["password"]
        }
    }).then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
})

router.get("/:id", (req, res) => {
    User.findOne({
        attributes: {
            exclude: ["password"]
        },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Pet,
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
                ]
            },
            {
                model: Pet,
                attributes: [`name`],
                through: SavedPet,
                as: `saved_pets`
            }
        ]
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No User Was Found Containing This ID" });
            return;
        }
        res.json(dbUserData);
    }).catch(err => res.status(500).json(err));
})

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.delete("/user/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;