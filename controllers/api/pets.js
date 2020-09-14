const router = require("express").Router();
//const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
    const body = req.body;
    res.json("Hello");
});

router.get("/:id", (req, res) => {
    const body = req.body;
    console.log(req.params.id);
    res.json("Hello");
});

module.exports = router;