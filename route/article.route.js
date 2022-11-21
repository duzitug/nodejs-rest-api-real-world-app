const express = require("express");
const router = express.Router();

const favoriteRoutes = require("../route/favorite.route.js");
const commentRoutes = require("../route/comment.route.js");

const {
  createArticle,
  allArticles,
  singleArticleBySlug,
  updateBySlug,
  deleteBySlug,
} = require("../controller/Article.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// Create Article
router.post("/", verifyToken, createArticle);

// All Articles - by Author/by Tag/Favorited by user
router.get("/", verifyToken, allArticles);

// Get Single Article by Slug
router.get("/:slug", verifyToken, singleArticleBySlug);

// Update Article
router.put("/:slug", verifyToken, updateBySlug);

// Delete Article
router.delete("/:slug", verifyToken, deleteBySlug);

// Favorites routes
router.use("/", favoriteRoutes);

//Comments Routes
router.use("/", commentRoutes);

module.exports = router;
