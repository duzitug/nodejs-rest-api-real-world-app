const express = require("express");
const router = express.Router();

const {
  createArticle,
  allArticles,
} = require("../controller/Articles.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// createArticle
router.post("/create", verifyToken, createArticle);

//? All Articles - by Author/by Tag/Favorited by user
router.get("/", verifyToken, allArticles);

module.exports = router;
