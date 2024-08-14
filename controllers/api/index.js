const router = require("express").Router();


// Post

const postRouter = require('./postRoutes');
router.use("/post", postRouter);


module.exports = router;