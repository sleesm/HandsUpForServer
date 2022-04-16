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

//create custom category
async function addCustomCategory(req, res) {
    var post = req.body;
    var sendValue = [post.name, 0]; //send category name and is custom(0)

    //add in category tabel
    var category_id = await categoryModel.insertCategory(sendValue);
    if(!category_id)
        res.json({"result": "fail"});
    
    //add in category_custom_info table
    else {
        sendValue = [post.user_id, category_id, 0, post.access];
        var category_custom_id = await categoryModel.insertCustomCategory(sendValue);
        if(!category_custom_id)
            res.json({"result": "fail"});
        else {
            res.json({"result": "success", "category_id" : category_id, "category_custom_id": category_custom_id, "category_name" : post.name,
            "category_access" : post.access, "category_shared_count" : 0 });
        }
    }
}

module.exports = {
    getBuiltInCategory,
    addCustomCategory
}