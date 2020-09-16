
const router = require("express").Router();
const { Pet, User } = require("../../models/");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
    Pet.findAll({
        attributes: [
            "id", "name", "age", "info", "breed", "health_conditions", "img_url", "sex", "neutered", "house_trained", "adoption_fee", "user_id", "created_at"
        ],
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPostData => res.json(dbPostData))
        .catch(err => {
            res.status(500).json(err);
        })
})

router.get("/:id", (req, res) => {
    Pet.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id", "name", "age", "info", "breed", "health_conditions", "img_url", "sex", "neutered", "house_trained", "adoption_fee", "user_id", "created_at"
        ],
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: "No Pet Was Found With This ID."
            });
            return;
        }
        res.json(dbPostData)
    })
})

router.post("/", withAuth, (req, res) => {
    const body = req.body;
    Pet.create({ ...body, userId: req.session.userId })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
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