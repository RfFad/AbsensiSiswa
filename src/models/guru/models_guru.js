const connection = require('../../configs/Databases')
const gurumodel = {
    getguru : async (req, res) => {
        const id_guru = req.session.username
        return new Promise((resolve, reject) => {
            connection.query(`
             SELECT guru.*, mata_pelajaran.nama_mp AS nama_mp FROM guru JOIN mata_pelajaran ON guru.idm = mata_pelajaran.idm  WHERE nip = '${id_guru}'`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result[0]);
            });
        });
    },
}

module.exports = gurumodel