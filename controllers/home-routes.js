const router = require(`express`).Router();
const { Post, User, Pet } = require(`../models`);

router.get(`/`, (req,res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "img_url",
            "post_description",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render(`homepage`, {
                posts,
                loggedIn: req.session.loggin
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

router.get(`/post/:id`, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "img_url",
            "post_description",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: `No Post Was Found With This ID` });
            return;
        }

        const post = dbPostData.get({ plain: true });

        res.render(`single-post`, {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;