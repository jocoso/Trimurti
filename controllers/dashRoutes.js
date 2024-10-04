// Dashboard

const router = require('express').Router();

const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    let outData; // Output
    const author_id = req.session.author_id;

    try {

        // The user has logged in
        if (author_id) {
            // Fetch all the posts
            const user_posts = await Post.findAll({
                where: { author_id }
            });

            // If the user has posts...
            if (user_posts.length > 0) {
                outData = user_posts.map(post => post.get({ plain: true }));
            }
            else // The User has no posts
            {
                outData = [{ error: "No posts to show." }]
            }

        }
        else // The user hasn't logged in
        {
            outData = [{ error: "You need to login to see your posts." }]
        }
    }
    catch (err) // Something went horribly in an unexpected way
    {
        outData = [{
            error: `Something unexpected happened. Refresh the page and try again. ${err.message}`,
        }]
    }

    res.render('dash', { outData, logged_in: req.session.logged_in });

})


module.exports = router;