const cardModel = require("../models/cardModel");
const categoryModel = require("../models/categoryModel");

//get cards corresponding to category id
async function getCard(req, res) {
    var post = req.body;
    //check if category is built-in or custom
    var checkResult = await categoryModel.checkCategoryisBuiltIn(post.category_id);
    if(!checkResult)
        res.json({"result": "fail"});
    if(checkResult == true) { //if category is built-in
        var result = await cardModel.getBuiltInCard(post.category_id);
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
    var card_id = await cardModel.insertCard(sendValue);
    if(!card_id)
        res.json({"result": "fail"});
    //add in card_custom_info table
    else {
        sendValue = [post.user_id, card_id];
        var card_custom_id = await cardModel.insertCustomCard(sendValue);
        if(!card_custom_id)
            res.json({"result": "fail"});
        else {
            res.json({"result": "success", "card_id": card_id, "custom_card_id" : card_custom_id, "card_name" : post.name, "card_img_path" : post.img_path});
        }
    }
}

module.exports = {
    getCard,
    addCustomCard
}
