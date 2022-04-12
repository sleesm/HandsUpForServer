const pool = require('../modules/pool');

//get category_id and category_name from built-in categories
async function getBuiltInCategory() {
    const query = `SELECT * FROM category WHERE category_is_built_in=1`;
    try {
        const result = await pool.queryParam(query);
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


module.exports = {
    getBuiltInCategory
}