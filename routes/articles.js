const express = require("express");
const router = express.Router();

const { createArticle } = require("../controller/Articles.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// createArticle
router.post("/create", verifyToken, createArticle);

module.exports = router;
