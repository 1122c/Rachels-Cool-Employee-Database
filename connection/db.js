const mysql = require("mysql2")

// bridge between mysql server and javascript files for queries
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "glcat22",
    database: "tracker_db"
});

connection.connect(function(err){
    if (err) throw err
    console.log("Tracker DB connected")
});

module.exports = connection;