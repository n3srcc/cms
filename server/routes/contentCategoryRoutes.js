const express = require('express');
const router = express.Router();
const ContentCategoryController = require('../controllers/ContentCategoryController');
const { authenticate, authorizeAdmin } = require('../middleware/authenticate');

router.post('/', authenticate, authorizeAdmin, ContentCategoryController.createContentCategory);
router.get('/', ContentCategoryController.getAllContentCategories);
router.get('/:id', ContentCategoryController.getContentCategoryById);
router.put('/:id', authenticate, authorizeAdmin, ContentCategoryController.updateContentCategory);
router.delete('/:id', authenticate, authorizeAdmin, ContentCategoryController.deleteContentCategory);

module.exports = router;
