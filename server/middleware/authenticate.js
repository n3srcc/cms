const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId }, { password: 0 });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.userType === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
};

const authorizeCreator = (req, res, next) => {
  if (req.user && (req.user.userType === 'admin' || req.user.userType === 'creator')) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized access' }); 
  }
};

const authorizeReader = (req, res, next) => {
  if (req.user && (req.user.userType === 'admin' || req.user.userType === 'creator' || req.user.userType === 'reader')) {
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
};

module.exports = { authenticate, authorizeAdmin, authorizeCreator, authorizeReader };
