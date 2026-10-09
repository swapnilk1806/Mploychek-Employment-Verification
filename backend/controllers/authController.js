const User = require("../models/User");
const safeUser = require("../utils/safeUser");

async function login(req, res) {
  try {
    let { userId, password, role } = req.body;

    userId = String(userId || "").trim();
    password = String(password || "").trim();
    role = String(role || "").trim();

    console.log("");
    console.log("LOGIN REQUEST");
    console.log("User ID:", userId);
    console.log("Role:", role);

    if (!userId || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID, password and role are required."
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      console.log("LOGIN FAILED: User does not exist.");
      return res.status(401).json({
        success: false,
        message: "User does not exist. Please use an existing user account."
      });
    }

    if (user.password !== password) {
      console.log("LOGIN FAILED: Wrong password.");
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      });
    }

    if (user.role !== role) {
      console.log("LOGIN FAILED: Wrong role.");
      return res.status(401).json({
        success: false,
        message: `Wrong role. This account is registered as ${user.role}.`
      });
    }

    if (user.status !== "Active") {
      console.log("LOGIN FAILED: User inactive.");
      return res.status(403).json({
        success: false,
        message: "This user account is inactive."
      });
    }

    console.log("LOGIN SUCCESS:", user.userId);

    return res.json({
      success: true,
      message: "Login successful.",
      user: safeUser(user)
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login."
    });
  }
}

module.exports = { login };