const express = require("express");
const router = express.Router();

const {
  createComment,
  allComments,
} = require("../controller/Comment.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// Create Comment
router.post("/:slug", verifyToken, createComment);

// Get All Comments
router.get("/:slug", allComments);

module.exports = router;
