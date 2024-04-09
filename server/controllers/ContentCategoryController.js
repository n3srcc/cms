const ContentCategory = require('../models/ContentCategory');

exports.createContentCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const contentCategory = new ContentCategory({ name });
    await contentCategory.save();
    res.status(201).json({ message: 'ContentCategory created successfully', ContentCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllContentCategories = async (req, res) => {
  try {
    const categories = await ContentCategory.find().select('-__v');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContentCategoryById = async (req, res) => {
  try {
    const contentCategory = await ContentCategory.findById(req.params.id).select('-__v');
    if (!contentCategory) {
      return res.status(404).json({ error: 'ContentCategory not found' });
    }
    res.json(contentCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContentCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const contentCategory = await ContentCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!contentCategory) {
      return res.status(404).json({ error: 'ContentCategory not found' });
    }
    res.json({ message: 'ContentCategory updated successfully', contentCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContentCategory = async (req, res) => {
  try {
    const contentCategory = await ContentCategory.findByIdAndDelete(req.params.id);
    if (!contentCategory) {
      return res.status(404).json({ error: 'ContentCategory not found' });
    }
    res.json({ message: 'ContentCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
