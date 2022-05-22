const pool = require('../modules/pool');
const {Storage} = require('@google-cloud/storage');
const stream = require('stream');

async function getCards(category_id) {
    const query = `SELECT * FROM card WHERE card.category_id=? AND (card.card_is_built_in=true OR (SELECT card_custom_info.card_id FROM card_custom_info WHERE card_custom_info.user_id=? AND card_custom_info.card_id=card.card_id));`;
    try {
        const result = await pool.queryParam(query, category_id).catch(
            function (error) {
                console.log(error);
                return null;
            });
        var cardInfo = [];
        //get id and name
        for (ca of result) {
            var card = {};
            card.card_id = ca.card_id;
            card.card_name = ca.card_name;
            card.card_img_path = ca.card_img_path;
            card.card_is_built_in = ca.card_is_built_in;
            cardInfo.push(card);
        }
        cardInfo = JSON.stringify(cardInfo);
        return cardInfo;
    } catch(error) {
        return false;
    }
}

async function getBuiltInCards(category_id) {
    const query = `SELECT * FROM card WHERE category_id = ? AND card_is_built_in = true`;
    try {
        const result = await pool.queryParam(query, category_id).catch(
            function (error) {
                console.log(error);
                return null;
            });
        var cardInfo = [];
        //get id and name
        for (ca of result) {
            var card = {};
            card.card_id = ca.card_id;
            card.card_name = ca.card_name;
            card.card_img_path = ca.card_img_path;
            card.card_is_built_in = ca.card_is_built_in;
            cardInfo.push(card);
        }
        cardInfo = JSON.stringify(cardInfo);
        return cardInfo;
    } catch(error) {
        return false;
    }
}

async function getCustomCardsUsingUserId(sendValue) { // category_id, user_id
    const query = `SELECT card.card_id, category_id, card_name, card_img_path, card_is_built_in, card_custom_info_id, user_id FROM card INNER JOIN card_custom_info ON card.card_id = card_custom_info.card_id WHERE category_id = ? AND user_id = ? AND card_is_built_in = false`;
    try {
        const result = await pool.queryParam(query, sendValue).catch(
            function (error) {
                console.log(error);
                return null;
            });
        var cardInfo = [];
        //get id and name
        for (ca of result) {
            var card = {};
            card.category_id =  ca.category_id;
            card.card_id = ca.card_id;
            card.card_name = ca.card_name;
            card.card_img_path = ca.card_img_path;
            card.card_is_built_in = ca.card_is_built_in;
            cardInfo.push(card);
        }
        cardInfo = JSON.stringify(cardInfo);
        return cardInfo;
    } catch(error) {
        return false;
    }
}

async function getCustomCards(category_id) { // category_id, user_id
    const query = `SELECT card.card_id, category_id, card_name, card_img_path, card_is_built_in, card_custom_info_id, user_id FROM card INNER JOIN card_custom_info ON card.card_id = card_custom_info.card_id WHERE category_id = ? AND card_is_built_in = false`;
    try {
        const result = await pool.queryParam(query, category_id).catch(
            function (error) {
                console.log(error);
                return null;
            });
        var cardInfo = [];
        //get id and name
        for (ca of result) {
            var card = {};
            card.category_id =  ca.category_id;
            card.card_id = ca.card_id;
            card.card_name = ca.card_name;
            card.card_img_path = ca.card_img_path;
            card.card_is_built_in = ca.card_is_built_in;
            cardInfo.push(card);
        }
        cardInfo = JSON.stringify(cardInfo);
        return cardInfo;
    } catch(error) {
        return false;
    }
}

//insert card
async function insertCard(sendValue) {
    const query = `INSERT INTO card (category_id, card_name, card_img_path, card_is_built_in) VALUES (?, ?, ?, ?)`;
    try {
        const result = await pool.queryParam(query, sendValue).catch(
            function (error) {
                return null;
            });
        return result.insertId;
    } catch(error) {
        return null;
    }
}

//insert custom card
async function insertCustomCard(sendValue) {
    const query = `INSERT INTO card_custom_info (user_id, card_id) VALUES (?, ?)`;
    try {
        const result = await pool.queryParam(query, sendValue).catch(
            function (error) {
                return null;
            });
        console.log(result.insertId);
        return result.insertId;
    } catch(error) {
        return null;
    }
}

async function uploadFile(name, contents, user_id) {
    const curTime = getTime();
    const storage = new Storage();
    const bucketName = 'huco-bucket';
    const filePath = 'cardImage/' + user_id + "/" + curTime + "_"
    const destFileName = filePath + name + ".png";

    const myBucket = storage.bucket(bucketName);
    
    try {
        const file = myBucket.file(destFileName);
        // Create a pass through stream from a string
        const passthroughStream = new stream.PassThrough();
        passthroughStream.write(Buffer.from(contents, 'base64'));
        passthroughStream.end();
    
        passthroughStream.pipe(file.createWriteStream({
            metadata: {
                contentType: 'image/png',
                metadata: {
                  custom: 'metadata'
                }
              }
        })).on('finish', () => {});
        
        return curTime;  
    } catch (error) {
        console.log(error);
    }
}

function getTime(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; 
    let date = today.getDate(); 

    let hours = today.getHours(); 
    let minutes = today.getMinutes();  

    return year.toString() + month.toString() + date.toString() + "_" + hours + ":" + minutes
}

module.exports = {
    getCards,
    getBuiltInCards,
    getCustomCardsUsingUserId,
    getCustomCards,
    insertCard,
    insertCustomCard,
    uploadFile
}