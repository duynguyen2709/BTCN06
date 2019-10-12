const conn = require('../utilities/mysql');

module.exports.getUser = async (username) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE username = ?', [username])
        .then(([rows, fields]) => {
            return [rows, fields];
        })

    return res[0];
}

module.exports.createUser = async (username, password) => {
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO User SET ?', {
            username: username,
            password: password
        })
        .then(([rows, fields]) => {
            return [rows, fields];
        })

    return res;
}