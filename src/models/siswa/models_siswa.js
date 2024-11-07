const connection = require('../../configs/Databases')
const siswamodel = {
    getsiswa : async (req, res) => {
        const id_siswa = req.session.username
        return new Promise((resolve, reject) => {
            connection.query(`
             SELECT siswa.*, kelas.nama_kelas AS nama_kelas, tahun_ajaran.nama_ajaran AS nama_ajaran FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id_kelas INNER JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth WHERE siswa.nis = '${id_siswa}'`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    },
}

module.exports = siswamodel