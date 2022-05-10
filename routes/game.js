var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

//get result of requested image
router.post('/result', gameController.getResultByGameVersion);

module.exports = router;