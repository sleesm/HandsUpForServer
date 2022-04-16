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

//create custom card
async function addCustomCard(req, res) {
    var post = req.body;
    var sendValue = [post.category_id, post.name, post.img_path, 0]; //send category id, card name, card image path and is custom(0)

    //add in card tabel
    var card_id = await categoryModel.insertCard(sendValue);
    if(!card_id)
        res.json({"result": "fail"});

    //add in card_custom_info table
    else {
        sendValue = [post.user_id, card_id];
        var card_custom_id = await categoryModel.insertCustomCard(sendValue);
        if(!card_custom_id)
            res.json({"result": "fail"});
        else {
            res.json({"result": "success", "card_id": card_id, "custom_card_id" : card_custom_id, "card_name" : post.name, "card_img_path" : post.img_path});
        }
    }
}

module.exports = {
    getBuiltInCategory,
    addCustomCategory,
    getCard,
    addCustomCard
}