const express = require("express");
const apiDelay = require("../middleware/apiDelay");
const { getStats } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", apiDelay, getStats);

module.exports = router;