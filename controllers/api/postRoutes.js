// Post

<<<<<<< Updated upstream
<<<<<<< Updated upstream
const router = require("express").Router();
const { Post, User } = require("../../models");

// Add a new Post
router.post("/", async (req, res) => {
    try {
=======
=======
>>>>>>> Stashed changes
const router = require('express').Router();
const { Post, User } = require('../../models')

// Add a new Post
router.post('/', async (req, res) => {

    try {

        // Creating Post
        const response = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
>>>>>>> Stashed changes

        // Retrieving important information about the post and its author...
        const { title, content } = req.body;
        const author_id = req.session.author_id;

        // Only registered users can post
        if (!author_id) {
            return res
                .status(403) // Forbidden
                .json({
                    message: "Only registered users may post.",
                    data: [],
                    error: "- Unauthorized User -",
                });
        }

        const newPost = await Post.create({ title, content, author_id });

        // Post Created without errors.
        res.status(200).json({
            message: "Post successfully created",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            data: newPost.toJSON(),
=======
            data: response,
>>>>>>> Stashed changes
=======
            data: response,
>>>>>>> Stashed changes
        });
    } catch (err) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        // An oopsie
=======
=======
>>>>>>> Stashed changes

        // Code-Breaking error
>>>>>>> Stashed changes
        res.status(400).json({
            message: "Post couldn't be created.",
            data: [],
            error: err.message,
        });

    }

});

// Get All Posts (Mostly for testing)
router.get("/", async (req, res) => {
    try {
        // Getting all posts
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ["username"] }],
        });

        if (!posts) {
            console.log({ message: "Couldn't find post.", data: [] });
            return res
                .status(404)
                .json({ message: "Couldn't find post.", data: [] });
        }

        // Posts were found successfully!
        res.status(200).json({
            message: "Posts successfully retrieved.",
            data: posts,
        });
    } catch (err) {
        // Code-breaking error
        res.status(400).json({
            message: "Failed to retrieve posts.",
            data: [],
            error: err,
        });
    }
});

// Get Post By ID (Mostly for testing)
router.get("/:id", async (req, res) => {
    try {
        // Getting by Primary Key
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["username"] }],
        });

        // Incorrect ID
        if (!post) {
            return res.status(404).json({
                message: "Couldn't find the post",
                data: [],
            });
        }

        // Post was found
        res.status(200).json({
            message: "Post successfully retrieved.",
            data: post,
        });
    } catch (err) {
        // A code-breaking error
        res.status(400).json({
            message: "Post couldn't be retrieved at this time",
            data: [],
            error: err.message,
        });
    }
});

// Update a Post
router.put("/:id", async (req, res) => {
    try {
        // Updating...
        const response = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // Incorrect ID
        if (!response[0]) {
            res.status(404).json({
                message: "Couldn't find post.",
            });
        }

        // A success!
        res.status(200).json({
            message: "Post updated successfully!",
            data: response,
        });
    } catch (err) {
        // A code-breaking error
        res.status(500).json({
            message: "Post couldn't be updated at this time.",
            data: [],
            error: err,
        });
    }
});

// Delete a Post
<<<<<<< Updated upstream
<<<<<<< Updated upstream
router.delete("/:id", async (req, res) => {
    // Deleting...
=======
router.delete('/:id', async (req, res) => {
=======
router.delete('/:id', async (req, res) => {

    try {
>>>>>>> Stashed changes

>>>>>>> Stashed changes
    try {
        const response = Post.destroy({
            where: { id: req.params.id },
        });

        // ID is unknown
        if (!response) {
            res.status(400).json({
                message: "Couldn't find post.",
                data: [],
                error: new Error("ERROR: User not found.")
            });
        }

        // A success!
        res.status(200).json({
            message: "Post deleted successfully!",
            data: response,
        });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes

>>>>>>> Stashed changes
    } catch (err) {

        // A code-breaking error happened.
        res.status(500).json({
            message: "Post couldn't be deleted at this time.",
            data: [],
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            error: err,
        });
=======
            error: err.message
        });

>>>>>>> Stashed changes
=======
            error: err.message
        });

>>>>>>> Stashed changes
    }
});

module.exports = router;
