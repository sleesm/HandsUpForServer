const pool = require('../modules/pool');

//get category_id and category_name from built-in categories
async function getBuiltInCategory() {
    const query = `SELECT * FROM category WHERE category_is_built_in=1`;
    try {
        const result = await pool.queryParam(query).catch(
            function (error) {
                console.log(error);
                return null;
            });
        var categoryInfo = [];
        //get id and name
        for (cate of result) {
            var category = {};
            category.category_id = cate.category_id;
            category.category_name = cate.category_name;
            categoryInfo.push(category);
        }
        categoryInfo = JSON.stringify(categoryInfo);
        return categoryInfo;
    } catch(error) {
        return null;
    }
}

async function checkCategoryisBuiltIn(category_id) {
    const query = `SELECT category_is_built_in FROM category WHERE category_id = ?`;
    try {
        const result = await pool.queryParam(query, category_id).catch(
            function (error) {
                console.log(error);
                return null;
            });
        if(result[0].category_is_built_in == 1)
            return true;
        else
            return false;
    } catch(error) {
        return false;
    }
}

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

module.exports = {
    getBuiltInCategory,
    checkCategoryisBuiltIn,
    getBuiltInCard
}