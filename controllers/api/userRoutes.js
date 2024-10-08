const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// New User
router.post("/", async (req, res) => {
    try {
        // Hashing the password
        req.body.password = await hashPassword(req.body.password);

        // Creating user
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        // Saving user in session
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        // Handling any errors
        res.status(400).json({
            message: "Failed to create user.",
            data: [],
            error: err.message,
        });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        // Finding user by username
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        // User not found
        if (!userData) {
            return res.status(400).json({
                message: "No user registered with that username.",
                data: [],
            });
        }

        // Validating password
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        // Password mismatch
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password. Please try again.",
                data: [],
            });
        }

        // Logging in and saving session
        req.session.save(() => {
            req.session.author_id = userData.id;
            req.session.logged_in = true;
            res.json({
                message: "You have successfully logged in",
                data: userData,
            });
        });
    } catch (err) {
        // Handling any errors
        res.status(500).json({
            message: "Login has failed. Please try again later...",
            data: [],
            error: err.message,
        });
    }
});

// Logout
router.post("/logout", (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session.logged_in) {
            // Destroy session
            req.session.destroy(() => {
                return res.status(200).json({
                    message: "Logged out successfully.",
                    data: [],
                });
            });
        } else {
            return res.status(400).json({
                message: "No session to log out from.",
                data: [],
                error: new Error("ERROR: Log out unsuccessful"),
            });
        }
    } catch (err) {
        // Handling any errors
        return res.status(500).json({
            message: "An error has occurred while trying to log out.",
            data: [],
            error: err.message,
        });
    }
});

// Delete User
router.delete("/:id", async (req, res) => {
    try {
        // Deleting user
        const response = await User.destroy({
            where: { id: req.params.id },
        });

        // User not found
        if (response === 0) {
            return res.status(400).json({
                message: "Couldn't find the user.",
                data: [],
                error: new Error("ERROR: User not found."),
            });
        }

        // Success
        res.status(200).json({
            message: "User was deleted successfully!",
            data: response,
        });
    } catch (err) {
        // Handling any errors
        res.status(500).json({
            message: "User couldn't be deleted at this time.",
            data: [],
            error: err.message,
        });
    }
});

module.exports = router;
