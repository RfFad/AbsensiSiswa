const mysql = require('mysql');
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});








module.exports ={
    showGuruDashboard(req,res){
        const id = req.session.username;
        connect.connect(function(err, connection) {
            return new Promise((resolve, reject) => {
                connection.query(`
                  SELECT * FROM guru where nip = '${id}' 
                    `, (error, result) => {
                        if(error) {
                            return reject (error) ;
                        }
                        resolve(result[0]);
                    })
            })
        })
    }
}