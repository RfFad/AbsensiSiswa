const connection = require('../../configs/Databases')
const siswamodel = {
    getsiswa : async (req, res) => {
        const id_siswa = req.session.username
        return new Promise((resolve, reject) => {
            connection.query(`
             SELECT * FROM siswa WHERE nis = '${id_siswa}'`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    },
}

module.exports = siswamodel