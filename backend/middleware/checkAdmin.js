const User = require("../models/User");

async function checkAdmin(req, res, next) {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Admin user ID is required."
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Admin user not found."
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can perform this action."
      });
    }

    if (user.status !== "Active") {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive."
      });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({
      success: false,
      message: "Admin authorization failed."
    });
  }
}

module.exports = checkAdmin;