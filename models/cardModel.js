const pool = require('../modules/pool');

async function getBuiltInCard(category_id) {
    const query = `SELECT * FROM card WHERE category_id = ?`;
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
            card.custom_card_id = null;
            card.card_name = ca.card_name;
            card.card_img_path = ca.card_img_path;
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
        return result.insertId;
    } catch(error) {
        return null;
    }
}

module.exports = {
    getBuiltInCard,
    insertCard,
    insertCustomCard
}