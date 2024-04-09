require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const path = require('path');
const specs = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const contentCategoryRoutes = require('./routes/contentCategoryRoutes');
const topicRoutes = require('./routes/topicRoutes');
const contentRoutes = require('./routes/contentRoutes');
const { upload } = require('./utils/uploader');
const { authenticate, authorizeCreator } = require('./middleware/authenticate');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(MONGODB_URI);

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/user', userRoutes);
app.use('/api/content-category', contentCategoryRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/content', contentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/api/upload', authenticate, authorizeCreator, upload.single('file'), (req, res) => {
  try {
    const filename = req.filename;
    res.json({ filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
