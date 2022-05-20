var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get built-in categories
router.get('/',categoryController.getBuiltInCategory);

//get custom categories
router.post('/custom',categoryController.getCustomCategory);

//get public access categories
router.post('/custom/public',categoryController.getPublicCategory);

//create custom category
router.post('/create', categoryController.addCustomCategory);

module.exports = router;