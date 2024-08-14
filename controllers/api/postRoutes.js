// Post

const router = require("express").Router();
const { Post } = require("../../models")

// Add a new Post
router.post('/', async (req, res) => {
    try {

        const response = await Post.findAll();
        const postData = response.map(post => post.get({ plain: true }));

        // Showing in the homepage
        res.render('home', {
            message: "Posts successfully created.",
            data: postData,
        });

    } catch (err) {

        res.render('home', {
            message: "Couldn't communicate with the database.",
            data: [],
            error: err,
        })
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

        // A code-breaking error
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

// Update a post by ID
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
        })

    }
});

module.exports = router;
