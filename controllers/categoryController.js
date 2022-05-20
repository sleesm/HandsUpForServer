const categoryModel = require("../models/categoryModel");

//get built-in categories in JSON format
async function getBuiltInCategory(req, res) {
    var result = await categoryModel.getBuiltInCategory();
    if(!result)
        res.json({"result": "fail"});
    else {
        var categories = JSON.parse(result);
        res.json({"result": "success", "categories": categories});
    }
}

//get all custom category using user_id
async function getCustomCategory(req,res){
    var post = req.body;
    var customResult = await categoryModel.getCustomCategoryInfo(post.user_id);
    if(!customResult)
        res.json({"result": "fail"});
    else {
        var categories = JSON.parse(customResult);
        res.json({"result": "success", "categories": categories});
    }
}

//get public access category
async function getPublicCategory(req,res){
    var post = req.body;
    var result = await categoryModel.getAllPulicCategory(post.user_id);
    if(!result)
        res.json({"result": "fail"});
    else {
        var categories = JSON.parse(result);
        res.json({"result": "success", "categories": categories});
    }
}

//create custom category
async function addCustomCategory(req, res) {
    var post = req.body;
    var sendValue = [post.name, 0]; //send category name and is custom(0)

    //add in category tabel
    var category_id = await categoryModel.insertCategory(sendValue);
    if(!category_id)
        res.json({"result": "fail"});
    else {//add in category_custom_info table
        sendValue = [post.user_id, category_id, 0, post.access];
        var category_custom_id = await categoryModel.insertCustomCategory(sendValue);
        console.log(category_custom_id)
        if(!category_custom_id)
            res.json({"result": "fail"});
        else {
            res.json({"result": "success", "category_id" : category_id, "category_custom_id": category_custom_id, "category_name" : post.name,
            "category_access" : post.access });
        }
    }
}

module.exports = {
    getBuiltInCategory,
    getCustomCategory,
    getPublicCategory,
    addCustomCategory
}