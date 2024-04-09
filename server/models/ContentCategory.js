const mongoose = require('mongoose');

const ContentCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('ContentCategory', ContentCategorySchema, 'content_category');
