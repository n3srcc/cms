const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/ContentController');
const { authenticate, authorizeCreator } = require('../middleware/authenticate');

router.post('/', authenticate, authorizeCreator, ContentController.addContent);
router.get('/', ContentController.getAllContents);
router.get('/:id', ContentController.getContentById);
router.get('/topic/:topicId', ContentController.searchContentByTopic);
router.get('/search', ContentController.searchContentByName);
router.get('/count', ContentController.getCountContentsByContentCategory);

module.exports = router;
