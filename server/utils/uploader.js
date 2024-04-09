const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${extname}`;
    cb(null, filename);
    req.filename = filename;
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/plain' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('El archivo debe ser de tipo texto (txt) o imagen (jpg, jpeg, png)'));
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = { upload };
