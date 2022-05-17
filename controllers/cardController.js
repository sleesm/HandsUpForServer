const cardModel = require("../models/cardModel");
const categoryModel = require("../models/categoryModel");

//get all cards using category_id and user_id
async function getCard(req,res){
    var post = req.body;
    var sendValue = [post.category_id, post.user_id];
    var result = await cardModel.getCards(sendValue);
    if(!result)
        res.json({"result": "fail"});
    else {
        var cards = JSON.parse(result);
        res.json({"result": "success", "cards": cards});
    }
}

//get built-in cards using category_id
async function getBuiltInCard(req, res) {
    var post = req.body;
    var result = await cardModel.getBuiltInCards(post.category_id);
    if(!result)
        res.json({"result": "fail"});
    else {
        var cards = JSON.parse(result);
        res.json({"result": "success", "cards": cards});
    }
}

//get custom cards using category_id and user_id
async function getCustomCard(req,res){
    var post = req.body;
    var sendValue = [post.category_id, post.user_id];
    var result = await cardModel.getCustomCards(sendValue);
    if(!result)
        res.json({"result": "fail"});
    else {
        var cards = JSON.parse(result);
        res.json({"result": "success", "cards": cards});
    }
}

//create custom card
async function addCustomCard(req, res) {
    var post = req.body;
    // upload image in storage
    const curTime = cardModel.uploadFile(post.name, post.img_path, post.user_id);
    
    const img_path = "https://storage.googleapis.com/huco-bucket/cardImage/" + post.user_id + "/" + curTime + "_" + post.name +".png"
    var sendValue = [post.category_id, post.name, img_path, 0]; //send category id, card name, card image path and is custom(0)

    // add in card table
    var card_id = await cardModel.insertCard(sendValue);

    if(!card_id)
        res.json({"result": "fail"});
    //add in card_custom_info table
    else {
        sendValue = [post.user_id, card_id];
        console.log(sendValue);
        var card_custom_id = await cardModel.insertCustomCard(sendValue);
        if(!card_custom_id)
            res.json({"result": "fail"});
        else {
            res.json({"result": "success", "card_id": card_id, "card_name" : post.name, "card_img_path" : post.img_path});
        }
    }   
}

module.exports = {
    getCard,
    getBuiltInCard,
    getCustomCard,
    addCustomCard
}
