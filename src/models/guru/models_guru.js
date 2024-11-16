const connection = require('../../configs/Databases')
const gurumodel = {
    getguru : async (req, res) => {
        const id_guru = req.session.username
        return new Promise((resolve, reject) => {
            connection.query(`
             SELECT guru.*, mata_pelajaran.nama_mp AS nama_mp, mata_pelajaran.idm FROM guru JOIN mata_pelajaran ON guru.idm = mata_pelajaran.idm  WHERE nip = '${id_guru}'`, (error, result) => {
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
    },
    getDataSiswa : async (nip) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT jadwal.*, siswa.*, kelas.nama_kelas, tahun_ajaran.nama_ajaran FROM jadwal 
                INNER JOIN kelas ON jadwal.idk = kelas.id_kelas
                INNER JOIN siswa ON kelas.id_kelas = siswa.id_kelas 
                INNER JOIN guru ON jadwal.idg = guru.id_guru 
                INNER JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth
                WHERE guru.nip = ?`, [nip], (error, results) => {
                    if(error){
                        return reject(error)
                    }
                    resolve(results);
                })
        })
    }
}
// SELECT jadwal.*, siswa.*, kelas.nama_kelas, tahun_ajaran.nama_ajaran FROM jadwal INNER JOIN kelas ON jadwal.idk = kelas.id_kelas INNER JOIN siswa ON kelas.id_kelas = siswa.id_kelas INNER JOIN guru ON jadwal.idg = guru.id_guru INNER JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth WHERE guru.nip= "13334568"
module.exports = gurumodel