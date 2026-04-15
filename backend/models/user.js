const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["candidate", "recruiter", "admin"],
    default: "candidate",
  },

  // Candidate Fields
  resume: {
    type: String, // multer file path
  },

  skills: {
    type: [String],
    default: [],
  },

  experience: {
    type: Number,
    default: 0,
  },

  // Recruiter Fields
  company: {
    type: String,
  },

},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);