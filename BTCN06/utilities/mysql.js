const mysql = require('mysql');

const con = mysql.createConnection({
    host: "167.179.80.90",
    user: "1612145",
    password: "1612145",
    database: "AdvancedWebDevelopment"
});

con.connect(function(){
    console.log("connected");
});

module.exports = con;