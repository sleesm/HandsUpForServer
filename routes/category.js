var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get all categories
router.post('/',categoryController.getAllCategory);

//get all categories
router.get('/built-in',categoryController.getBuiltInCategory);

//get custom categories
router.post('/custom',categoryController.getCustomCategory);

//get public access categories
router.post('/custom/public',categoryController.getPublicCategory);

//create custom category
router.post('/create', categoryController.addCustomCategory);

module.exports = router;