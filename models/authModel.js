const pool = require('../modules/pool');

//for sign in, insert user
async function insertUser(user) {
    const query = `INSERT INTO user (user_name, user_email, user_password) VALUES (?, ?, ?)`;
    try {
        const result = await pool.queryParam(query, user);
        return result;
    } catch(error) {
        return null;
    }
}

//for sign up and delete user, get user by email
async function getUserByEmail(email) {
    const query = `SELECT * FROM user WHERE user_email=?`;
    try {
        const result = await pool.queryParam(query, email).catch(
            function (error) {
                return null;
            });
        return result;
    } catch(error) {
        return null;
    }
}

//for show user info, get user by user id 
async function getUserById(user_id) {
    const query = `SELECT * FROM user WHERE user_id=?`;
    try {
        const result = await pool.queryParam(query, user_id).catch(
            function (error) {
                return null;
            });
        return result;
    } catch(error) {
        return null;
    }
}

//for edit user info, get user info by user id
async function updateUserInfoById(newUserInfo) {
    const query = `UPDATE user SET user_name=?, user_password=? WHERE user_id=?`;
    try {
        const result = await pool.queryParam(query, newUserInfo).catch(
            function (error) {
                return null;
            });
        return result;
    } catch(error) {
        return null;
    }
}

//for delete user, get user by user id
async function deleteUserById(user_id) {
    const query = `DELETE FROM user WHERE user_id=?`;
    try {
        const result = await pool.queryParam(query, user_id).catch(
            function (error) {
                return null;
            });
        return result;
    } catch(error) {
        return null;
    }
}



module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    updateUserInfoById,
    deleteUserById
}