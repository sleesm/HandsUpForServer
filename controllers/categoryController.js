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

//check if category is built-in or custom
async function isBuiltInCategory(req, res) {
    var post = req.body;
    var result = await categoryModel.checkCategoryisBuiltIn(post.category_id);
    if(!result)
        res.json({"result": "fail"});
    if(result == false) // if category is customed
        return false;
    else // if category is built-in
        return true;

}

//get cards corresponding to category id
async function getCard(req, res) {
    var post = req.body;
    var checkResult = await isBuiltInCategory(req, res);
    if(checkResult == true) { //if category is built-in
        var result = await categoryModel.getBuiltInCard(post.category_id);
        if(!result)
            res.json({"result": "fail"});
        else {
            var cards = JSON.parse(result);
            res.json({"result": "success", "cards": cards});
        }
    }
    else { //if category is customed -> TO-DO

    }
}

module.exports = {
    getBuiltInCategory,
    isBuiltInCategory,
    getCard
}