// Homepage

const router = require("express").Router();

router.get("/", async (req, res) => {
    const person = "joshua";
    const date = new Date().toLocaleDateString("en-GB");
    res.render("home", { person, date });
});

module.exports = router;
