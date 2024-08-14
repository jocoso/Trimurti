// Post

const router = require("express").Router();
const { Post } = require("../../models")

// Add a new Post
router.post('/', async (req, res) => {
    try {

        const response = await Post.findAll();

        const postData = response.map(post => post.get({ plain: true }));

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

        const response = await Post.findAll();

        res.status(200).json({
            message: "Posts successfully retrieved.",
            data: response,
        });

    } catch (err) {

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

        const response = await Post.findByPk(
            req.params.id,
            {
            }
        );

        res.status(200).json({
            message: "Post successfully retrieved.",
            data: response,
        })

    } catch (err) {

        res.status(400).json({
            message: "Post couldn't be retrieved at this time",
            data: [],
            error: err,
        })
    }
})

module.exports = router;
