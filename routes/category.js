var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get built-in categories
router.get('/',categoryController.getBuiltInCategory);

module.exports = router;