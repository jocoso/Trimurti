const router = require("express").Router();

// Post
const postRouter = require('./postRoutes');
router.use("/post", postRouter);

// User
const userRouter = require('./userRoutes');
router.use("/user", userRouter);

const commentRouter = require('./commentRoutes');
router.use("/comment", commentRouter);

module.exports = router;