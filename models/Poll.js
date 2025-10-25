const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 }
});
const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('Poll', pollSchema);
