// Post

const router = require("express").Router();
const { Post } = require("../../models")

// Add a new Post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json({
                message: "Sucessfully Created a Post!", 
                data: postData
        });

    } catch(err) {
        res.status(400).json({
            message: "Failed to create a Post",
            error: err.toString(),
        })
    }
});

module.exports = router;