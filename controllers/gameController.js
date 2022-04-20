require('dotenv').config();
var request = require('request');

async function getGameResult(req, res){
    var post = req.body;

    var requestJson = {
        'access_key': process.env.ACCESS_KEY,
        'argument': {
            'first_word': post.answer,
            'second_word': post.result,
        }
    };

    var options = {
        url: process.env.OPEN_API_URL,
        body: JSON.stringify(requestJson),
        headers: {'Content-Type':'application/json; charset=UTF-8'}
    };
    
    request.post(options, function (error, response, body) {
        console.log('responseCode = ' + response.statusCode);
        console.log('responseBody = ' + body);
        console.log(body.result);
        if(body.result = 0){
            if(body.return_object["WWN WordRelInfo"].Similarity[0] > 0.8)
                res.json({"result": "success", "correct" : true});
            else
            res.json({"result": "success", "correct" : false});
        }else{
            res.json({"result": "fail"});
        }
    });
}

module.exports = {getGameResult}