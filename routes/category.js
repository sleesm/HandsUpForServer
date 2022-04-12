var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

//get built-in categories
router.get('/',categoryController.getBuiltInCategory);

//get cards corresponding to categories
router.post('/card', categoryController.getCard);

module.exports = router;