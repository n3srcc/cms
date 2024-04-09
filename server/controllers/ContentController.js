const Content = require('../models/Content');

exports.addContent = async (req, res) => {
  const { title, contentCategory, topic, content, images, video, document } = req.body;
  const createdBy = req.user._id;
  const obj_content = new Content({ title, contentCategory, topic, content, images, video, document, createdBy });
  await obj_content.save();
  res.status(201).json({ message: 'Content created successfully', obj_content });
};

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find().populate({
      path: 'contentCategory',
      select: 'name'
    })
      .populate({
        path: 'topic',
        select: 'name'
      })
      .populate({
        path: 'createdBy',
        select: { username: 1, _id: 0 }
      })
      .select('-__v');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).select('-__v');
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCountContentsByContentCategory = async (req, res) => {
  try {
    const contents = await Content.aggregate([
      {
        $group: {
          _id: '$ContentCategory',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'content_category',
          localField: '_id',
          foreignField: 'contentCategory',
          as: 'ContentCategory'
        }
      },
      {
        $unwind: '$ContentCategory'
      },
      {
        $project: {
          _id: 0,
          categoryName: '$ContentCategory.name',
          count: 1
        }
      }
    ]);

    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchContentByName = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const contents = await Content.find({ title: { $regex: searchQuery, $options: 'i' } }).select('-__v');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
