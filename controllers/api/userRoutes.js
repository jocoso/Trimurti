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
router.post('/', async (req, res) => {
    try {

        // Season Password...
        req.body.password = await hashPassword(req.body.password);

        // Putting the user in the oven at 380 degrees...
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        // Saving the rest for later...
        req.session.save(() => {
            req.session.author_id = newUser.isSoftDeleted;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });


    } catch (err) {

        // We burn it. ):
        res.status(400).json({
            message: "Failed to create user.",
            data: [],
            error: err.message
        });
    }
});

// Login
router.post('/login', async (req, res) => {

    try {

        // Finding user...
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        // Couldn't find the User.
        if (!userData) {

            return res.status(400).json({
                message: "No user registered with that username.",
                data: []
            });

        }

        // Checking passwords match...
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        // Passwords do not match.
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password. Please try again.",
                data: []
            });
        }

        // Success! Saving the session in the store
        req.session.save(() => {
            req.session.author_id = userData.id;
            req.session.logged_in = true;
            res.json({
                message: "You have successfully logged in",
                data: userData
            })
        });

    } catch (err) {

        // Crash
        res.status(500).json({
            message: "Login has failed. Please try again later...",
            data: [],
            error: err.message
        });

    }

});

// Logout
router.post('/logout', (req, res) => {

    try {

        // If a section is active...
        if (req.session.logged_in) {

            // Kill session.
            req.session.destroy(() => {
                return res.status(200).json({
                    message: "Logged out successfully.",
                    data: []
                });
            });

        } else { // If no active session

            // Complain
            return res.status(400).json({
                message: "No session to log out from.",
                data: [],
                error: new Error("ERROR: Log out unsuccessful")
            });
        }

    } catch (err) {

        // A more serious error
        return res.status(500).json({
            message: "An error has ocurred while trying to logout.",
            data: [],
            error: err.message
        });

    }
});

module.exports = router;