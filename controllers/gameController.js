require('dotenv').config();
const axios = require('axios');

async function getGameResult(req, res){
    var post = req.body;
    let result = await axios({
        method: "post",
        url: process.env.OPEN_API_URL,
        data: {
            'access_key': process.env.ACCESS_KEY,
            'argument': {
                'first_word': post.answer,
                'second_word': post.result,
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
                res.json({"result": "success", "correct" : true});
            else
            res.json({"result": "success", "correct" : false});
        }else{
            res.json({"result": "fail"});
        }
    }).catch((error) => {
        console.log(error);
    });

    return result;
}

module.exports = {getGameResult}