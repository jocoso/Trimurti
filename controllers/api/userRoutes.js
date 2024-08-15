const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Seasoning the password...
const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;

}

// New User 
router.post("/", async (req, res) => {
    try {

        req.body.password = await hashPassword(req.body.password);
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUser.isSoftDeleted;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });


    } catch (err) {

        res.status(400).json({
            message: "Failed to create user.",
            data: [],
            error: err.message
        });
    }
});

module.exports = router;