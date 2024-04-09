const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/TopicController');
const { authenticate, authorizeAdmin } = require('../middleware/authenticate');

router.post('/', authenticate, authorizeAdmin, TopicController.createTopic);
router.get('/', TopicController.getAllTopics);
router.get('/:id', TopicController.getTopicById);
router.put('/:id', authenticate, authorizeAdmin, TopicController.updateTopic);
router.delete('/:id', authenticate, authorizeAdmin, TopicController.deleteTopic);

module.exports = router;
