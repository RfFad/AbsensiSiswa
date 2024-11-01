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
     UpdateGuru : async (id_guru, nama_guru, jk, jabatan, alamat, tlp, foto) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT * FROM guru WHERE id_guru = ?
            `, [id_guru], (error, results) => {
                if (error) return reject(error);
    
                if (results.length === 0) {
                    return reject(new Error('Data guru tidak ditemukan'));
                }
    
                // Update data
                connection.query(`
                    UPDATE guru 
                    SET nama_guru = ?, jk = ?, jabatan = ?, alamat = ?, tlp = ?, foto = ? 
                    WHERE id_guru = ?
                `, [ nama_guru, jk, jabatan, alamat, tlp, foto, id_guru], (updateError, updateResults) => {
                    if (updateError) return reject(updateError);
                    resolve(updateResults);
                });
            });
        });
    }
}

module.exports = gurumodel