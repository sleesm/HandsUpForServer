var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

//get text result
router.post('/result/text', gameController.getTextResult);

//get object result
router.post('/result/object', gameController.getObjectResult);

module.exports = router;