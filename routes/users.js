const express = require("express");
const router = express.Router();

const { signUp } = require("../controller/Users.controller.js");

// Login
router.post("/", signUp);

module.exports = router;
