const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/:id", async (req, res) => {
    try {
        const blog_id = req.params.id;

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
            where: { post_id: blog_id }, // Assuming the correct foreign key is post_id
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
