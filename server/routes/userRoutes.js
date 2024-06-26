const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.registerUser);
router.post('/auth', UserController.authUser);

module.exports = router;
