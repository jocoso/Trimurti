const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// Route for rendering the form to create a new post
router.get("/newpost", async (req, res) => {
    try {
        const sessionUserId = req.session.author_id;

        // Restrict access to unknown individual
        if(!sessionUserId) {
            return res.status(400).json({
                message: "You must be logged in to create a post.",
            });
        }

        // Validate if the userId is an integer
        if (!/^\d+$/.test(sessionUserId)) {
            return res.status(400).json({
                message: "Invalid user ID. It must be an integer.",
            });
        }

        // Render form for new post
        res.render("postform", {
            logged_in: req.session.logged_in,
            author_id: sessionUserId
        });
    } catch (err) {
        console.error("Error fetching post or comments:", err);

        // Error rendering form
        res.status(500).render("postform", {
            logged_in: req.session.logged_in,
            error: "Something went wrong while loading the post form."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blog_id = req.params.id;

        // Validate if the blog_id is an integer
        if (!/^\d+$/.test(blog_id)) {
            return res.status(400).json({
                message: "Invalid post ID. It must be an integer.",
            });
        }

        // Fetch post by Primary Key
        const post = await Post.findByPk(blog_id, {
            include: [{ model: User, attributes: ["username"] }],
        });

        // Post not found
        if (!post) {
            return res.render("post", {
                logged_in: req.session.logged_in,
                post: {
                    title: "The Void",
                    content: "There is nothing here...",
                },
                comments: [],
            });
        }

        // Extract plain data
        const postPlain = post.get({ plain: true });

        // Fetch related comments
        const comments = await Comment.findAll({
            where: { post_id: blog_id }, // Ensure that foreign key is correctly named post_id
            include: [{ model: User, attributes: ["username"] }],
        });

        // Convert Sequelize instances to plain objects
        const commentsPlain = comments.map((comment) =>
            comment.get({ plain: true })
        );

        // If no comments are found, add a placeholder
        if (commentsPlain.length === 0) {
            commentsPlain.push({
                title: "Sad",
                content: "No comments here.",
                User: { username: "Anonymous" }, // Adding username to be consistent
            });
        }

        // Render post with comments
        res.render("post", {
            logged_in: req.session.logged_in,
            post: postPlain,
            comments: commentsPlain,
        });
    } catch (err) {
        console.error("Error fetching post or comments:", err);

        // Error rendering
        res.status(500).render("post", {
            logged_in: req.session.logged_in,
            post: {
                title: "Oh No!",
                content: "Something went really wrong.",
            },
            comments: [],
        });
    }
});


module.exports = router;
