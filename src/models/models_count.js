
const connection = require('../configs/Databases'); // Adjust if necessary
const getCount = {
    CountGuru : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM guru 
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    },
    CountKelas : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM kelas 
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    },
    CountMapel : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM mata_pelajaran 
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    }
}


module.exports = getCount;
