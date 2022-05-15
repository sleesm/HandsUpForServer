var express = require('express');
var router = express.Router();
var cardController = require('../controllers/cardController');

//get cards corresponding to categories
router.post('/', cardController.getBuiltInCard);

//get custom categories
router.post('/custom', cardController.getCustomCard);

//create custom card
router.post('/create', cardController.addCustomCard);

module.exports = router;