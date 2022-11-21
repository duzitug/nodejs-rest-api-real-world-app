const express = require("express");
const router = express.Router();

const {
  createComment,
  allComments,
  deleteComment,
} = require("../controller/Comment.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// Create Comment
router.post("/:slug/comments", verifyToken, createComment);

// Get All Comments
router.get("/:slug/comments", verifyToken, allComments);

// Delete Comment
router.delete("/:slug/comments/:commentId", verifyToken, deleteComment);

module.exports = router;
