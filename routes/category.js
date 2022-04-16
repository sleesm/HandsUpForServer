var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get built-in categories
router.get('/',categoryController.getBuiltInCategory);

//create custom category
router.post('/create', categoryController.addCustomCategory);

//get cards corresponding to categories
router.post('/card', categoryController.getCard);

//create custom card
router.post('/card/create', categoryController.addCustomCard);

module.exports = router;