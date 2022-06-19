require('dotenv').config();
const axios = require('axios');
const gameModel = require("../models/gameModel");

async function getResultByGameVersion(req, res) {
    var post = req.body;
    var version = parseInt(post.gameVersion);
    if(version == 1)
        getTextResult(req, res);
    else
        getObjectResult(req,res);
}

async function getTextResult (req, res) {
    var post = req.body;
    var img = post.image;
    let buf = Buffer.from(img, 'base64');

    gameModel.getText(buf).then(function(result){
        if(result == false)
            res.json({"result": "fail"});
        else if(post.answer == result)
            res.json({"result": "success", "correct" : "correct"});
        else{
            res.json({"result": "success", "correct" : "incorrect"});
        }
    });
}

async function getObjectResult(req, res) {
    var post = req.body;
    var img = post.image;
    let buf = Buffer.from(img, 'base64');
    gameModel.getObject(buf).then(function(result){
        if(result == false)
            res.json({"result": "fail"});
        else if(!result)
            res.json({"result": "success", "correct" : "incorrect"});
        else{
            getTranslateResult(result, req, res);
        }
    });
}

async function getTranslateResult(name, req, res) {
    gameModel.translateText(name,"ko").then(function(result){
        getSimilarityResult(result[0], req, res);
    });
}

async function getSimilarityResult(translated, req, res) {
    var post = req.body;
    let result = await axios({
        method: "post",
        url: process.env.OPEN_API_URL,
        timeout: 60000, //optional
        httpAgent: new http.Agent({ keepAlive: true }),
        data: {
            'access_key': process.env.ACCESS_KEY,
            'argument': {
                'first_word': post.answer,
                'second_word': translated,
            }
        },
        headers: {
            "Content-Type": "application/json",
            "charset": "UTF-8"
        }

    }).then((response) => {
        simarilty = response.data.return_object["WWN WordRelInfo"].WordRelInfo.Similarity[0].SimScore;
        if(!response.data.result){
            if(simarilty > 0.8)
                res.json({"result": "success", "correct" : "correct"});
            else
                res.json({"result": "success", "correct" : "incorrect"});
        }else{
            res.json({"result": "fail"});
        }
    }).catch((error) => {
        console.log(error);
    });

    return result;
}

module.exports = {
    getResultByGameVersion,
    getTextResult,
    getObjectResult,
    getTranslateResult
}