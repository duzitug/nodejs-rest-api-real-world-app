const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const { favoriteToggler } = require("../controller/Favorite.controller.js");

//* Favorite Article
router.post("/:slug/favorite", verifyToken, favoriteToggler);
//* Unfavorite Article
router.delete("/:slug/favorite", verifyToken, favoriteToggler);

module.exports = router;
