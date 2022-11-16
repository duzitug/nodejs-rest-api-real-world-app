const express = require("express");
const router = express.Router();

const {
  createArticle,
  allArticles,
  singleArticleBySlug,
  updateBySlug,
  deleteBySlug,
} = require("../controller/Articles.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// Create Article
router.post("/create", verifyToken, createArticle);

//? All Articles - by Author/by Tag/Favorited by user
router.get("/", verifyToken, allArticles);

// Get Single Article by Slug
router.get("/:slug", verifyToken, singleArticleBySlug);

// Update Article
router.put("/:slug", verifyToken, updateBySlug);

// Delete Article
router.delete("/:slug", verifyToken, deleteBySlug);

module.exports = router;
