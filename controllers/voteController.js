const Vote = require('../models/Vote');
const Poll = require('../models/Poll');

exports.castVote = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    if(pollId == null || optionIndex == null) return res.status(400).json({ message: 'Invalid' });
    const poll = await Poll.findById(pollId);
    if(!poll || !poll.isActive) return res.status(400).json({ message: 'Poll not active or not found' });
    // ensure not voted
    const existing = await Vote.findOne({ pollId, userId: req.user._id });
    if(existing) return res.status(400).json({ message: 'Already voted' });
    // record vote
    const vote = await Vote.create({ pollId, userId: req.user._id, optionIndex });
    poll.options[optionIndex].votes = (poll.options[optionIndex].votes || 0) + 1;
    await poll.save();
    res.json({ message: 'Vote counted' });
  } catch(err) {
    if(err.code === 11000) return res.status(400).json({ message: 'Already voted' });
    res.status(500).json({ message: err.message });
  }
};
