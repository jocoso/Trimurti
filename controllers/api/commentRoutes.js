const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// Add a new Comment
router.post("/", async (req, res) => {
    try {
        const { title, content, post_id } = req.body; // Assuming 'post_id'

        if (!req.session.author_id) {
            return res
                .status(403) // Forbidden
                .json({
                    message: "Only registered users may comment.",
                    data: [],
                    error: "- Unauthorized User -",
                });
        }

        // Creating comment
        const newComment = await Comment.create({
            title,
            content,
            author_id: req.session.author_id, // Ensure session contains author_id
            post_id, // Change from blog_id to post_id to match your model
        });

        // Comment Created without errors
        res.status(200).json({
            message: "Comment successfully created",
            data: newComment.toJSON(),
        });
    } catch (err) {
        // Code-breaking error
        res.status(400).json({
            message: "Comment couldn't be created.",
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

        if (!posts.length) {
            return res
                .status(404)
                .json({ message: "No posts found.", data: [] });
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
            error: err.message,
        });
    }
});

// Get Comments by Post ID (Updated for 'post_id')
router.get("/:post_id", async (req, res) => {
    try {
        // Getting comments by Post ID
        const comments = await Comment.findAll({
            where: { post_id: req.params.post_id }, // Updated to 'post_id'
        });

        // No comments found for the given post_id
        if (!comments.length) {
            return res.status(404).json({
                message: "No comments found for this post.",
                data: [],
            });
        }

        // Comments were found
        res.status(200).json({
            message: "Comments successfully retrieved.",
            data: comments,
        });
    } catch (err) {
        // A code-breaking error
        res.status(400).json({
            message: "Comments couldn't be retrieved at this time.",
            data: [],
            error: err.message,
        });
    }
});

// Update a Post
router.put("/:id", async (req, res) => {
    try {
        // Updating post
        const response = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // Incorrect ID
        if (!response[0]) {
            return res.status(404).json({
                message: "Couldn't find post.",
            });
        }

        // A success!
        return res.status(200).json({
            message: "Post updated successfully!",
            data: response,
        });
    } catch (err) {
        // A code-breaking error
        return res.status(500).json({
            message: "Post couldn't be updated at this time.",
            data: [],
            error: err.message,
        });
    }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
    try {
        // Destroy post...
        const response = await Post.destroy({
            where: { id: req.params.id },
        });

        // ID is unknown
        if (!response) {
            return res.status(404).json({
                message: "Couldn't find post.",
                data: [],
            });
        }

        // A success!
        res.status(200).json({
            message: "Post deleted successfully!",
            data: response,
        });
    } catch (err) {
        // A code-breaking error happened.
        res.status(500).json({
            message: "Post couldn't be deleted at this time.",
            data: [],
            error: err.message,
        });
    }
});

module.exports = router;
