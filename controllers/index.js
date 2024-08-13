const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const dashRoutes = require("./dashRoutes");
const authRoutes = require("./authRoutes");

router.use("/", homeRoutes);
router.use("/dash", dashRoutes);
router.use("/auth", authRoutes);

module.exports = router;
