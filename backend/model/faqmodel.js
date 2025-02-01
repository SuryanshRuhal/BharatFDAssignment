const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  answer_hi: { type: String}, 
  answer_bn: { type: String },
  question_hi: { type: String },
  question_bn: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("FAQ", FAQSchema);
