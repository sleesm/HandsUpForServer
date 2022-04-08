const userModel = require("../models/auth_model");

//for sign in, insert user
async function postUserInfo(req, res) {
    var post = req.body;
    var userInfo = [ post.name, post.email, post.password];
    var result = await userModel.insertUser(userInfo);
    if(!result)
        res.json({"result": "fail"});
    else
        res.json({"result": "success"});
}

//for sign up, check email and password
async function getUserIdByEmail(req, res) {
    var post = req.body;
    var result = await userModel.getUserByEmail(post.email);
    if(!result.length)
        res.json({"result": "fail"});
    else{
        if(result[0].user_password == post.password) //success sign in
            res.json({"result": "success", "user_id": result[0].user_id});
        else
            res.json({"result": "fail"});
    }
        
}

//for show user info, get user info by user id
async function getUserInfoById(req, res) {
    var post = req.body;
    var result = await userModel.getUserById(post.user_id);
    if(!result.length)
        res.json({"result": "fail"});
    else
        res.json({"result": "success", "user_name": result[0].user_name, "user_email": result[0].user_email});
}

//for edit user info, get user info by user id
async function updateUserInfo(req, res) {
    var post = req.body;
    var newUserInfo = [post.name, post.password, post.user_id];
    var result = await userModel.updateUserInfoById(newUserInfo);
    if(!result)
        res.json({"result": "fail"});
    else {
        if(result.affectedRows != 1)
            res.json({"result": "fail"});
        else
            res.json({"result": "success"});
    }
}

//for delete user, check email and password
async function getUserPasswordCorrect(req) {
    var post = req.body;
    var result = await userModel.getUserByEmail(post.email);
    return new Promise(function(resolve, reject) {
        if(!result.length)
            resolve(false);
        else{
            if(result[0].user_password == post.password) //success sign in
                resolve(result[0].user_id);
            else
                resolve(false);
        }
    });
        
}

//for delete user info, get user info by user id
async function deleteUser(req, res) {
    var post = req.body;
    var result = await userModel.deleteUserById(post.user_id);
    if(!result)
        res.json({"result": "fail"});
    else {
        if(result.affectedRows != 1)
            res.json({"result": "fail"});
        else
            res.json({"result": "success"});
    }
    
}

module.exports = {
    postUserInfo,
    getUserIdByEmail,
    getUserInfoById,
    updateUserInfo,
    getUserPasswordCorrect,
    deleteUser
}