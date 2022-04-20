var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

//get game result
router.post('/result', gameController.getGameResult);

module.exports = router;