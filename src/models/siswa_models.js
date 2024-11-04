const mysql = require('mysql');
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});








module.exports ={
    showSiswaDashboard(req,res){
        const id = req.session.username;
        connect.connect(function(err, connection) {
            return new Promise((resolve, reject) => {
                connection.query(`
                  SELECT * FROM siswa where nis = '${id}' 
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