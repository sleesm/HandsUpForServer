var express = require('express');
var router = express.Router();
var cardController = require('../controllers/cardController');

//get all cards
router.post('/', cardController.getCard);

//get built-in cards
router.post('/built-in', cardController.getBuiltInCard);

//get custom cards
router.post('/custom', cardController.getCustomCard);

//create custom card
router.post('/create', cardController.addCustomCard);

module.exports = router;