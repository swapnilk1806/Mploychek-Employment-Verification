const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    candidateName: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    verificationType: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Pending"],
      default: "Pending"
    },
    submittedOn: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);