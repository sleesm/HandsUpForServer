var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth_controller');

//sign up
router.post('/signup', (req, res) => {
    authController.postUserInfo(req, res);
});

//sign in
router.post('/signin', function(req, res) {
    authController.getUserIdByEmail(req,res);
});

//show user info
router.post('/user', function(req, res) {
    authController.getUserInfoById(req,res);
});

// update user info
router.post('/user/update', function(req, res) {
    authController.updateUserInfo(req, res);
});

// delete user
router.post('/user/delete', function(req,res) {
    authController.getUserPasswordCorrect(req, res).then((respond) => {
        console.log(respond);
        if(respond == false)
            res.json({"result": "fail"});
        else{
            req.body.user_id = respond;
            authController.deleteUser(req,res);
        }
            
    });
});

module.exports = router;