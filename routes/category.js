var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get built-in categories
router.get('/',categoryController.getBuiltInCategory);

//create custom category
router.post('/create', categoryController.addCustomCategory);

module.exports = router;