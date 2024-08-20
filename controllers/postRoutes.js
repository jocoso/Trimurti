// Post
const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/:id", async (req, res) => {
    try {
        const blog_id = req.params.id;

        // Getting by Primary Key
        const post = await Post.findByPk(blog_id, {
            include: [{ model: User, attributes: ["username"] }],
        });

        // Incorrect ID
        if (!post) {
            return res.render("post", {
                logged_in: req.session.logged_in,
                post: {
                    title: "The void",
                    content: "There is nothing here...",
                },
                comments: [],
            });
        }

        const postPlain = post.get({ plain: true });

        const comments = await Comment.findAll({
            where: { blog_id },
            include: [{model: User, attributes: ["username"]}],
        })

        const commentsPlain = await comments.map(comment =>
            comment.get({ plain: true })
        );

        if(commentsPlain.length === 0) {
            commentsPlain.push({ title: "Sad", comment: "No comments Here."});
        }

        res.render('post', {
            logged_in: req.session.logged_in,
            post: postPlain,
            comments: commentsPlain
        })

    } catch (err) {

        console.error("Error fetching post or comments:", err);
        res.status(500).render('post', {
            logged_in: req.session.logged_in,
            post: {
                title: "Oh No!",
                content: "Something went really wrong.",
            },
            comments: []
        })
    }
});

module.exports = router;
