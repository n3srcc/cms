const { Schema, model } = require('mongoose');

const contentSchema = new Schema({
  title: { type: String, required: true },
  contentCategory: { type: Schema.Types.ObjectId, ref: 'ContentCategory', required: true },
  content: { type: String, required: true },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  images: { type: String },
  video: { type: String },
  document: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Content', contentSchema);
