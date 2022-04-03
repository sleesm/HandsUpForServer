var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var qs = require('querystring');

//sign up
router.post('/signup', function(request, response) {
    var post = request.body;
    
    db.query(`SELECT COUNT(*) AS emailCount FROM user WHERE user_email=?`, [post.email],
        function(error, result) {
            if(error) {
                throw error;
            }
            if(result[0].emailCount == 0) { //check for duplicate email address
                db.query(`INSERT INTO user (user_name, user_email, user_password) VALUES (?, ?, ?)`, [post.name, post.email, post.password],
                    function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.json({
                            "result": "success"
                        });
                });
            }
            else {
                response.json({
                    "result": "fail"
                });
            }
    });
});


module.exports = router;