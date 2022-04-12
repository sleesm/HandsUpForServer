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

//get cards corresponding to category id
async function getCard(req, res) {
    var post = req.body;
    //check if category is built-in or custom
    var checkResult = await categoryModel.checkCategoryisBuiltIn(post.category_id);
    if(!checkResult)
        res.json({"result": "fail"});
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
    getCard
}