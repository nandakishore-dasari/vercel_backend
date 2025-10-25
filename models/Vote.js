const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  optionIndex: Number
}, { timestamps: true });
voteSchema.index({ pollId: 1, userId: 1 }, { unique: true });
module.exports = mongoose.model('Vote', voteSchema);
