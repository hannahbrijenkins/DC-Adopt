
const router = require("express").Router();
const { Post, User } = require("../../models/");
const withAuth = require("../../auth");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id", "title", "img_url", "post_description", "created_at"
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
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id", "title", "img_url", "post_description", "created_at"
        ],
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: "No Post Was Found With This ID."
            });
            return;
        }
        res.json(dbPostData)
    })
})

router.post("/", withAuth, (req, res) => {
    const body = req.body;
    console.log(req.session.userId);
    Post.create({ ...body, userId: req.session.userId })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put("/:id", withAuth, (req, res) => {
    Post.update(req.body, {
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
    Post.destroy({
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