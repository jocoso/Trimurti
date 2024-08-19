const router = require("express").Router();

router.get('/', async (req, res) => {
    
    if (req.session.logged_in) {
        // Redirect to the home page or any other page if logged in
        return res.redirect('/'); // Adjust '/home' to your desired route
    }

    // If not logged in, render the login page
    res.render('auth');
});

router.get('/test-session', (req, res) => {
    req.session.test = 'This is a test';
    res.json({ session: req.session });
})

module.exports = router;