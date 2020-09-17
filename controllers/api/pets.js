const router = require("express").Router();
const { Pet, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
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
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPetData => res.json(dbPetData))
        .catch(err => {
            res.status(500).json(err);
        });
})

router.get("/:id", (req, res) => {
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
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPetData => {
        if (!dbPetData) {
            res.status(404).json({
                message: "No Pet Was Found With This ID."
            });
            return;
        }
        res.json(dbPetData)
    })
})

router.post("/", withAuth, (req, res) => {
    Pet.create({
        name: req.body.name,
        age: req.body.age,
        info: req.body.info,
        breed: req.body.breed,
        health_conditions: req.body.health_conditions,
        sex: req.body.sex,
        neutered: req.body.neutered,
        house_trained: req.body.house_trained,
        adoption_fee: req.body.adoption_fee,
        user_id: req.session.userId
    })
        .then(newPet => {
            res.json(newPet);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put("/:id", withAuth, (req, res) => {
    Pet.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete("/:id", withAuth, (req, res) => {
    Pet.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;