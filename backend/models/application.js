const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
  // Candidate who applied
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Job applied to
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  // Resume uploaded during application
  resume: {
    type: String, // file path from multer
    required: true,
  },

  // Application status
  status: {
    type: String,
    enum: ["applied", "reviewed", "accepted", "rejected"],
    default: "applied",
  },

},
{ timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);