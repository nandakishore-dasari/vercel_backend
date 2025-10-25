const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

exports.createPoll = async (req, res) => {
  try {
    const { question, options, startDate, endDate } = req.body;
    if(!question || !options || !Array.isArray(options) || options.length < 2) return res.status(400).json({ message: 'Invalid poll' });
    const opts = options.map(o => ({ text: o }));
    const poll = await Poll.create({ question, options: opts, startDate, endDate, createdBy: req.user._id });
    res.json(poll);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if(!poll) return res.status(404).json({ message: 'Not found' });
    res.json(poll);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.results = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if(!poll) return res.status(404).json({ message: 'Not found' });
    res.json({ question: poll.question, options: poll.options });
  } catch(err) { res.status(500).json({ message: err.message }); }
};

exports.closePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    poll.isActive = false;
    await poll.save();
    res.json(poll);
  } catch(err) { res.status(500).json({ message: err.message }); }
};
