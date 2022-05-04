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

//insert category
async function insertCategory(sendValue) {
    const query = `INSERT INTO category (category_name, category_is_built_in) VALUES (?, ?)`;
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

//insert custom category
async function insertCustomCategory(sendValue) {
    const query = `INSERT INTO category_custom_info (user_id, category_id, category_access) VALUES (?, ?, ?)`;
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
    getBuiltInCategory,
    checkCategoryisBuiltIn,
    insertCategory,
    insertCustomCategory
}