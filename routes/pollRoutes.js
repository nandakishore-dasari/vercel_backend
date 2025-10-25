const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const pollController = require('../controllers/pollController');

router.get('/', auth, pollController.getAll);
router.get('/:id', auth, pollController.getById);
router.get('/:id/results', auth, pollController.results);
router.post('/', auth, pollController.createPoll);
router.post('/:id/close', auth, role('admin'), pollController.closePoll);

module.exports = router;
