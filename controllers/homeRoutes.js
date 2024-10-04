const router = require("express").Router();
const { Post } = require("../models");

router.get("/", async (req, res) => {
    try {
        // Fetching all posts from the database
        const response = await Post.findAll();

        // Ensure we have posts to render
        const postData = response ? response.map(post => post.get({ plain: true })) : [];

        // Render the home page with posts and session data
        res.render("home", {
            posts: postData,
            logged_in: req.session.logged_in, // Send session status for conditional rendering
        });
    } catch (err) {
        console.error("Failed to fetch post data:", err);

        // Render error information if post fetching fails
        res.render("home", {
            posts: [],
            error: "Failed to load posts.", // Display error on the page
            logged_in: req.session.logged_in, // Send session status for conditional rendering
        });
    }
});

module.exports = router;
