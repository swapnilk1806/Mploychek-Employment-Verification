const express = require("express");
const apiDelay = require("../middleware/apiDelay");
const checkAdmin = require("../middleware/checkAdmin");
const {
  listUsers,
  getUser,
  updateUser,
  changeStatus,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/", checkAdmin, apiDelay, listUsers);
router.get("/:userId", checkAdmin, getUser);
router.put("/:userId", checkAdmin, updateUser);
router.patch("/:userId/status", checkAdmin, changeStatus);
router.delete("/:userId", checkAdmin, deleteUser);

module.exports = router;