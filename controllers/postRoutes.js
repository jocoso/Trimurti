// Post
const router = require('express').Router();
const { Post, User } = require("../models");

router.get('/:id', async (req, res) => {

    let post;

    try {

        // Getting by Primary Key
        post = (await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["username"] }],
        })).get({ plain: true });

        // Incorrect ID
        if (!post) {
            post = {
                title: "The Void",
                content: "There is nothing here"
            }
        }

    } catch (err) {

        // A code-breaking error
        post = {
            title: "Oh No!",
            content: "Something went really wrong."
        }
    }

    res.render('post', {
        logged_in: req.session.logged_in,
        post
    });

});

module.exports = router;