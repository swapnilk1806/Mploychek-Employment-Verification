const express = require("express");
const apiDelay = require("../middleware/apiDelay");
const { getRecords } = require("../controllers/recordController");

const router = express.Router();

router.get("/", apiDelay, getRecords);

module.exports = router;