const User = require("../models/User");
const Record = require("../models/Record");

async function getStats(req, res) {
  try {
    const { userId, role } = req.query;

    let records;

    if (role === "Admin") {
      records = await Record.find();
    } else {
      records = await Record.find({ userId });
    }

    const completed = records.filter(r => r.status === "Completed").length;
    const inProgress = records.filter(r => r.status === "In Progress").length;
    const pending = records.filter(r => r.status === "Pending").length;

    let totalUsers = 0;

    if (role === "Admin") {
      totalUsers = await User.countDocuments();
    }

    return res.json({
      success: true,
      stats: {
        totalRecords: records.length,
        completed,
        inProgress,
        pending,
        totalUsers
      }
    });
  } catch (error) {
    console.error("Stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load statistics."
    });
  }
}

module.exports = { getStats };