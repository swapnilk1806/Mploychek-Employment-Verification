const User = require("../models/User");
const Record = require("../models/Record");
const DEFAULT_USERS = require("../data/defaultUsers");
const DEFAULT_RECORDS = require("../data/defaultRecords");

async function setupDefaultData() {
  console.log("");
  console.log("Checking default users...");

  for (const defaultUser of DEFAULT_USERS) {
    const existing = await User.findOne({ userId: defaultUser.userId });

    if (!existing) {
      await User.create(defaultUser);
      console.log(`Created default user: ${defaultUser.userId}`);
    }
  }

  const recordCount = await Record.countDocuments();

  if (recordCount === 0) {
    await Record.insertMany(DEFAULT_RECORDS);
    console.log("Created default verification records.");
  }

  console.log("Default data check completed.");
}

module.exports = setupDefaultData;