const userModel = require("../models/authModel");

//for sign up, insert user
async function createUser(req, res) {
    var post = req.body;
    var userInfo = [ post.name, post.email, post.password];
    var result = await userModel.insertUser(userInfo);
    if(!result)
        res.json({"result": "fail"});
    else
        res.json({"result": "success"});
}

//for sign in, check email and password
async function checkUserByEmail(req, res) {
    var post = req.body;
    var result = await userModel.getUserByEmail(post.email);
    if(!result.length)
        res.json({"result": "fail"});
    else{
        if(result[0].user_password == post.password) //success sign in
            res.json({"result": "success", "user_id": result[0].user_id, "user_name": result[0].user_name});
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
    else
        res.json({"result": "success"});
}

//for delete user, check email and password
async function getUserPasswordCorrect(req) {
    var post = req.body;
    var result = await userModel.getUserByEmail(post.email);

    if(!result.length)
        return false;
    else{
        if(result[0].user_password == post.password) //success sign in
            return result[0].user_id;
        else
            return false;
    }
        
}

//for delete user info, get user info by user id
async function deleteUser(req, res) {
    var post = req.body;
    var correctResult = await getUserPasswordCorrect(req);
    if(correctResult == false) {
        res.json({"result": "fail"});
    }
    else {
        var result = await userModel.deleteUserById(correctResult);
        if(!result)
            res.json({"result": "fail"});
        else
            res.json({"result": "success"});
    }
}

module.exports = {
    createUser,
    checkUserByEmail,
    getUserInfoById,
    updateUserInfo,
    getUserPasswordCorrect,
    deleteUser
}