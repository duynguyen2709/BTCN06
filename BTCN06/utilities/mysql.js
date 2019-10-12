const mysql = require('mysql2/promise');

var conn = null;

module.exports.initConnection = async () => {
    conn = await mysql.createConnection({
        host: "167.179.80.90",
        user: "1612145",
        password: "1612145",
        database: "AdvancedWebDevelopment"
    });
}

module.exports.getConnection = () => {return conn};