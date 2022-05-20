var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get built-in categories
router.get('/',categoryController.getBuiltInCategory);

//get custom categories
router.post('/custom',categoryController.getCustomCategory);

//create custom category
router.post('/create', categoryController.addCustomCategory);

//edit category
router.post('/update', categoryController.editCategory);

module.exports = router;