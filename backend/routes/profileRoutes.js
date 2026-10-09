const express = require("express");
const apiDelay = require("../middleware/apiDelay");
const { getProfile } = require("../controllers/profileController");

const router = express.Router();

router.get("/profile/:userId", apiDelay, getProfile);

module.exports = router;