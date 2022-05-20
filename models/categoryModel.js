const pool = require('../modules/pool');

// get category_id and category_name from built-in categories
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
            category.category_is_built_in = cate.category_is_built_in
            // category.category_custom_id = -1;
            category.category_access = 0;
            category.user_id = -1;
            categoryInfo.push(category);
        }
        categoryInfo = JSON.stringify(categoryInfo);
        return categoryInfo;
    } catch(error) {
        return null;
    }
}

// get custom category
async function getCustomCategoryInfo(user_id){
    const query = `select category.category_id, category_name, category_is_built_in, user_id, category_access, category_custom_info_id from category join (select * from category_custom_info where user_id = ?) as info where category.category_id = info.category_id;`;
    try {
        const result = await pool.queryParam(query, user_id).catch(
            function (error) {
                console.log(error);
                return null;
        });
        var customCategoryInfo = [];
        //get id and name
        for (cate of result) {
            var category = {};
            category.category_id = cate.category_id;
            category.category_name = cate.category_name;
            category.category_is_built_in = cate.category_is_built_in;
            category.category_access = cate.category_access;
            // category.category_custom_id = cate.category_custom_info_id;
            category.user_id = cate.user_id;
            customCategoryInfo.push(category);
        }
        customCategoryInfo = JSON.stringify(customCategoryInfo);
        return customCategoryInfo;
    } catch(error) {
        return false;
    }
}

// get public access category
async function getAllPublicCategory(user_id){
    const query = `SELECT category.category_id, category_name, category_is_built_in, user_id, category_access, category_custom_info_id FROM category JOIN (SELECT * FROM category_custom_info where category_access = 1 and user_id != ?) as info where category.category_id = info.category_id`;
    try {
        const result = await pool.queryParam(query, user_id).catch(
            function (error) {
                console.log(error);
                return null;
            });
        var publicCategories = [];
        //get id and name
        for (cate of result) {
            var category = {};
            category.category_id = cate.category_id;
            category.category_name = cate.category_name;
            category.category_is_built_in = cate.category_is_built_in;
            category.category_access = cate.category_access;
            // category.category_custom_id = cate.category_custom_info_id;
            category.user_id = cate.user_id;
            publicCategories.push(category);
        }
        publicCategories = JSON.stringify(publicCategories);
        return publicCategories;
    } catch(error) {
        return null;
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



module.exports = {
    getBuiltInCategory,
    getCustomCategoryInfo,
    getAllPublicCategory,
    insertCategory,
    insertCustomCategory
}