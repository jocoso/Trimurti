// Homepage

const router = require("express").Router();
const { Post } = require("../models");

router.get('/', async (req, res) => {
    try {

        const response = await Post.findAll();
        const postData = response.map(post => post.get({ plain: true }));

        res.render('home', {
            posts: postData,
            logged_in: req.session.logged_in,
        });

    } catch (err) {

        // Something weird happened.
        console.error("Failed to fetch post data:", err);
        res.render('home', {
            layout: 'main',
            posts: [],
            error: "Failed to load posts.",
            logged_in: req.session.logged_in,
        });

    }

});


module.exports = router;
