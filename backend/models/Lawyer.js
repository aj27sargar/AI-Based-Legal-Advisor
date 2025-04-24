const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
  name: String,
  experience: Number,
  cases: Number,
  specialization: String,
  contact: String,
});

module.exports = mongoose.model("Lawyer", lawyerSchema);
