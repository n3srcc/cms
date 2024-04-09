const Topic = require('../models/Topic');

exports.createTopic = async (req, res) => {
  try {
    const { name, coverImage, allowImage, allowVideo, allowDocument } = req.body;
    const topic = new Topic({ name, coverImage, allowImage, allowVideo, allowDocument });
    await topic.save();
    res.status(201).json({ message: 'Topic created successfully', topic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().select('-__v');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).select('-__v');
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const { name, coverImage, allowImage, allowVideo, allowDocument } = req.body;
    const topic = await Topic.findByIdAndUpdate(req.params.id, { name, coverImage, allowImage, allowVideo, allowDocument }, { new: true });
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json({ message: 'Topic updated successfully', topic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
