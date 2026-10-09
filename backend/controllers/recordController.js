const Record = require("../models/Record");

async function getRecords(req, res) {
  try {
    const { userId, role } = req.query;

    let records;

    if (role === "Admin") {
      records = await Record.find().sort({ createdAt: -1 });
    } else {
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required."
        });
      }
      records = await Record.find({ userId }).sort({ createdAt: -1 });
    }

    return res.json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    console.error("Records error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load records."
    });
  }
}

module.exports = { getRecords };