const User = require("../models/User");
const safeUser = require("../utils/safeUser");

async function getProfile(req, res) {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.json({
      success: true,
      user: safeUser(user)
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load profile."
    });
  }
}

module.exports = { getProfile };