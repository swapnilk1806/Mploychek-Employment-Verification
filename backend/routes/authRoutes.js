const express = require("express");
const apiDelay = require("../middleware/apiDelay");
const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/login", apiDelay, login);

module.exports = router;