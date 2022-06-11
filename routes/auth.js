var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

//sign up
router.post('/signup',authController.createUser);

//sign in
router.post('/signin', authController.checkUserByEmail);

//show user info
router.post('/user', authController.getUserInfoById);

// update user info
router.post('/user/update', authController.updateUserInfo);

// delete user
router.post('/user/delete', authController.deleteUser);

module.exports = router;