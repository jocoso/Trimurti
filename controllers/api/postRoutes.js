// Post

const router = require("express").Router();
const { Post } = require("../../models")

// Add a new Post
router.post('/', async (req, res) => {
    try {
        // Creating Post
        const response = await Post.create({
            ...req.body,
        });

        // Pet Created without errors
        res.status(200).json({
            message: "Pet successfully created",
            data: response,
        });

    } catch (err) {
        // Code-Breaking error
        res.status(400).json({
            message: "Post couldn't be created.",
            data: [],
            error: err,
        });
    }
});

// Get All Posts (Mostly for testing)
router.get('/', async (req, res) => {
    try {

        // Getting all posts
        const response = await Post.findAll();

        // Posts were found successfully!
        res.status(200).json({
            message: "Posts successfully retrieved.",
            data: response,
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
router.get('/:id', async (req, res) => {
    try {

        // Getting by Primary Key
        const response = await Post.findByPk(
            req.params.id,
            {
            }
        );

        // Incorrect ID
        if (!response[0]) {
            res.status(404).json({
                message: "Couldn't find post.",
            });
        }

        // Post was found
        res.status(200).json({
            message: "Post successfully retrieved.",
            data: response,
        })

    } catch (err) {

        // A code-breaking error
        res.status(400).json({
            message: "Post couldn't be retrieved at this time",
            data: [],
            error: err,
        })
    }
});

// Update a Post
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    // Deleting...
    try {

        const response = Post.destroy({
            where: { id: req.params.id },
        });

        // Unknown ID
        if (!response) {
            res.status(404).json({
                message: "Couldn't find post.",
                data: [],
            });
        }

        // A success!
        res.status(200).json({
            message: "Post deleted successfully!",
            data: response,
        })

    } catch (err) {
        // A code-breaking error
        res.status(500).json({
            message: "Post couldn't be deleted at this time.",
            data: [],
            error: err,
        })
    }
});


module.exports = router;
