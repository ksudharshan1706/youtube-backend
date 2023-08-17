const { signup, signin, googleAuth } = require("../controllers/auth.js");
const express = require("express");
const router = express.Router();

//CREATE A USER
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);

module.exports = router;
