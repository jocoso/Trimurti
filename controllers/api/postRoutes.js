// Post

const router = require("express").Router();
const { Post } = require("../../models")

// Add a new Post
router.post('/', async (req, res) => {
    try {
        const response = await Post.findAll();

        const postData = response.map(post => post.get({ plain: true }));

        res.render('home', {
            posts: postData,
        });
    } catch (err) {
        res.render('home', {
            posts: [],
            error: "Couldn't communicate with the database.",
        })
    }
});

// Get All Posts (MOSTLY FOR TESTING)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.status(200).json({
            message: "All posts retrieved successfully.",
            data: postData,
        });
    } catch (err) {
        res.status(400).json({
            message: "Failed to retrieve posts.",
            data: err.toString(),
        })
    }
})

module.exports = router;