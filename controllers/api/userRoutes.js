const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;

}

// New User 
router.post('/', async (req, res) => {
    try {

<<<<<<< Updated upstream
        // Season Password...
        req.body.password = await hashPassword(req.body.password);

        // Putting the user in the oven at 380 degrees...
=======
        // Seasoning the password...
        req.body.password = await hashPassword(req.body.password);

        // Creating user...
>>>>>>> Stashed changes
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

<<<<<<< Updated upstream
        // Saving the rest for later...
        req.session.save(() => {
            req.session.author_id = newUser.isSoftDeleted;
=======
        // Saving user in session.
        req.session.save(() => {
            req.session.user_id = newUser.id;
>>>>>>> Stashed changes
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });


    } catch (err) {

<<<<<<< Updated upstream
        // We burn it. ):
=======
        // A code-breaking error happened.
>>>>>>> Stashed changes
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

        // Success! Saving the session in the store.
        req.session.save(() => {
            req.session.author_id = userData.id;
            req.session.logged_in = true;
            res.json({
                message: "You have successfully logged in",
                data: userData
            })
        });

    } catch (err) {

        // A code-breaking error happened.
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

// // Geta All User (for testing)
// router.get('/', async (req, res) => {

// });

// Delete
router.delete('/:id', async (req, res) => {
    try {

        // Destroying user...
        const response = User.destroy({
            where: { id: req.params.id }
        });

        // ID is unknown
        if (!response) {
            return res.status(400).json({
                message: "Couldn't find the user.",
                data: [],
                error: new Error("ERROR: User not found.")
            })
        }

        // A success!
        res.status(200).json({
            message: "User was deleted successfully!",
            data: response.body.data
        });

    } catch (err) {

        // A code-breaking error happened.
        res.status(500).json({
            message: "User couldn't be deleted at this time.",
            data: [],
            error: err.message
        });

    }
});

module.exports = router;