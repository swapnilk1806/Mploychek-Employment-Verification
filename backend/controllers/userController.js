const User = require("../models/User");
const Record = require("../models/Record");
const safeUser = require("../utils/safeUser");

// GET all users (admin)
async function listUsers(req, res) {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: 1 });

    return res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load users."
    });
  }
}

// GET single user (admin)
async function getUser(req, res) {
  try {
    const user = await User.findOne({
      userId: req.params.userId
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get user."
    });
  }
}

// PUT update existing user (admin)
async function updateUser(req, res) {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist."
      });
    }

    const { name, email, password, role, status } = req.body;

    if (name) user.name = name.trim();
    if (email) user.email = email.trim().toLowerCase();
    if (password) user.password = password.trim();

    if (role) {
      if (!["Admin", "General User"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role."
        });
      }
      user.role = role;
    }

    if (status) {
      if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status."
        });
      }
      user.status = status;
    }

    await user.save();

    return res.json({
      success: true,
      message: "User updated successfully.",
      user: safeUser(user)
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user."
    });
  }
}

// PATCH status (admin)
async function changeStatus(req, res) {
  try {
    const userId = req.params.userId;
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Active or Inactive."
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist."
      });
    }

    if (user.userId === "admin" && status === "Inactive") {
      return res.status(400).json({
        success: false,
        message: "Main admin cannot be deactivated."
      });
    }

    user.status = status;
    await user.save();

    return res.json({
      success: true,
      message: `User status changed to ${status}.`,
      user: safeUser(user)
    });
  } catch (error) {
    console.error("Status update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status."
    });
  }
}

// DELETE user (admin)
async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;

    if (userId === "admin") {
      return res.status(400).json({
        success: false,
        message: "Main admin cannot be deleted."
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist."
      });
    }

    await User.deleteOne({ userId });
    await Record.deleteMany({ userId });

    return res.json({
      success: true,
      message: "User deleted successfully.",
      user: safeUser(user)
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user."
    });
  }
}

module.exports = {
  listUsers,
  getUser,
  updateUser,
  changeStatus,
  deleteUser
};