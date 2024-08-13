// Login

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("auth");
});

module.exports = router;
