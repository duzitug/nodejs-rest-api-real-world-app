const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const { followerToggler } = require("../controller/Profile.controller.js");

//? Profile
//router.get("/:username", verifyToken, getProfile);

//* Follow Profile
router.post("/:username/follow", verifyToken, followerToggler);

//* Unfollow Profile
router.delete("/:username/follow", verifyToken, followerToggler);

module.exports = router;
