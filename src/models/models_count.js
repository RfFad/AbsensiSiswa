
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
    CountUser : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM user 
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    },
    CountSiswa : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM siswa 
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
    },
    CountRiwayat : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM riwayat 
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    },
    CountTahun : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM tahun_ajaran 
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    },
    CountJadwal : async () => {
        return new Promise((resolve, reject) => {
            connection.query(`
              SELECT COUNT(*) AS count FROM jadwal
                `, (error, result) => {
                    if(error) {
                        return reject (error) ;
                    }
                    resolve(result[0]);
                })
        })
    },
}


module.exports = getCount;
