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

async function getCustomCategoryInfo(user_id){
    const query = `SELECT * FROM category_custom_info WHERE user_id = ?`;
    try {
        const result = await pool.queryParam(query, user_id).catch(
            function (error) {
                console.log(error);
                return null;
        });
        var customCategoryInfo = [];
        //get id and name
        for (cate of result) {
            var customCategory = {};
            customCategory.category_custom_id = cate.category_custom_info_id;
            customCategory.category_id = cate.category_id;
            customCategory.category_access = cate.category_access;
            customCategory.user_id = cate.user_id;
            customCategoryInfo.push(customCategory);
        }
        customCategoryInfo = JSON.stringify(customCategoryInfo);
        return customCategoryInfo;
    } catch(error) {
        return false;
    }
}

async function getSpecificCateogy(category_id){
    const query = `SELECT * FROM category WHERE category_id = ?`;
    try {
        const result = await pool.queryParam(query, category_id).catch(
            function (error) {
                console.log(error);
                return null;
        });
        var category = {};
        for (cate of result) {
            category.category_id = cate.category_id;
            category.category_name = cate.category_name;
        }
        category = JSON.stringify(category);
        return category;
    } catch(error) {
        return false;
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
                console.log(error);
                return null;
            });
        return result.insertId;
    } catch(error) {
        return null;
    }
}

//edit custom category
async function editCategory(sendValue) {
    const query = `UPDATE category, category_custom_info SET category_name=?, category_access=? WHERE category.category_id=?`;
    try {
        const result = await pool.queryParam(query, sendValue).catch(
            function (error) {
                return null;
            });
        return result;
    } catch(error) {
        return null;
    }
}

module.exports = {
    getBuiltInCategory,
    getCustomCategoryInfo,
    getSpecificCateogy,
    checkCategoryisBuiltIn,
    insertCategory,
    insertCustomCategory,
    editCategory
}