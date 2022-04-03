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

//show user info
router.post('/user', function(request, response) {
    var post = request.body;

    db.query(
        `SELECT * FROM user WHERE user_id=?`, [post.user_id],
        function(error, result) {
            if(error) {
                throw error;
            }
            if (!result.length) { //no user
                response.json({
                    "result": "fail"
                });
            }
            else {
                //user info
                response.json({
                    "result": "success",
                    "user_name": result[0].user_name,
                    "user_email": result[0].user_email,
                    "user_password": result[0].user_password
                });
            }
        }
    );
});

// update user info
router.post('/user/update', function(request, response) {
    var post = request.body;

    db.query(`SELECT COUNT(*) AS emailCount FROM user WHERE user_email=?`, [post.email],
        function(error, result) {
            if(error) {
                throw error;
            }
            if(result[0].emailCount == 0) { //check for duplicate email address
                db.query(
                    `UPDATE user SET user_name=?, user_email=?, user_password=? WHERE user_id=?`, [post.name, post.email, post.password, post.user_id],
                    function(error, result) {
                        if(error) {
                            throw error;
                        }
                        response.json({
                            "result": "success"
                        });
                    }
                );
            }
            else {
                response.json({
                    "result": "fail"
                });
            }
    });
});

// delete user
router.post('/user/delete', function(request, response) {
    var post = request.body;

    db.query(`SELECT * FROM user WHERE user_email=?`, [post.email],
        function(error, result) {
            if(error) {
                throw error;
            }
            if(result[0].user_password === post.password) { //check for password
                db.query(`DELETE FROM user WHERE user_email=?`, [post.email],
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