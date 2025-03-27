const mysql = require('mysql');

const connect = mysql.createConnection({
    host: "bydhxjrth2bmh8ybxfem-mysql.services.clever-cloud.com",
    user: "ud70zixcu63ynzst",
    password: "qywqGf9V5E2SWl1PtAdQ",
    database: "bydhxjrth2bmh8ybxfem"
});

module.exports = connect;
