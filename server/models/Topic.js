const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  coverImage: { type: String, required: true },
  allowImage: { type: Boolean, default: false },
  allowVideo: { type: Boolean, default: false },
  allowDocument: { type: Boolean, default: false }
});

module.exports = mongoose.model('Topic', topicSchema);
