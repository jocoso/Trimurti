// Post

const router = require("express").Router();
const { Post, User } = require("../../models")

// Add a new Post
router.post('/', async (req, res) => {
    try {
        // Creating Post
        const response = await Post.create({
            ...req.body,
            user_id: (req.session.user_id || 1),
        });

        // Post Created without errors
        res.status(200).json({
            message: "Post successfully created",
            data: response.toJSON(),
        });

    } catch (err) {
        // Code-Breaking error
        res.status(400).json({
            message: "Post couldn't be created.",
            data: [],
            error: err.message,
        });
    }
});

// Get All Posts (Mostly for testing)
router.get('/', async (req, res) => {
    try {

        // Getting all posts
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });

        if (!posts) {
            console.log({ message: "Couldn't find post.", data: [] });
            return res.status(404).json({ message: "Couldn't find post.", data: [] });
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
router.get('/:id', async (req, res) => {
    try {

        // Getting by Primary Key
        const post = await Post.findByPk(req.params.id,
            { include: [{ model: User, attributes: ['username'] }] }
        );

        // Incorrect ID
        if (!post) {

            return res.status(404).json({
                message: "Couldn't find the post",
                data: []
            });

        }

        // Post was found
        res.status(200).json({
            message: "Post successfully retrieved.",
            data: post,
        })

    } catch (err) {

        // A code-breaking error
        res.status(400).json({
            message: "Post couldn't be retrieved at this time",
            data: [],
            error: err.message,
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
