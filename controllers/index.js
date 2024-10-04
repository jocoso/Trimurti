const router = require("express").Router();

// API
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// HOME
const homeRoutes = require("./homeRoutes");
router.use("/", homeRoutes);

// DASH
const dashRoutes = require("./dashRoutes");
router.use("/dash", dashRoutes);

// AUTH
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

// POST
const postRoutes = require('./postRoutes');
router.use("/post", postRoutes);

module.exports = router;
