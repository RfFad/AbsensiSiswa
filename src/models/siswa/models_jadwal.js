const connection = require('../../configs/Databases');

module.exports = {
    jadwal : async(id_kelas, hari) => {
        return new  Promise((resolve, reject) =>{
            connection.query(`SELECT jadwal.idj, hari.hari AS hari, guru.nama_guru AS nama_guru, guru.nip AS nip, 
                   kelas.nama_kelas AS nama_kelas, kelas.id_kelas AS id_kelas, 
                   mata_pelajaran.nama_mp AS nama_mp, jadwal.jam_mulai, jadwal.jam_selesai 
            FROM jadwal 
            JOIN hari ON jadwal.idh = hari.idh 
            JOIN guru ON jadwal.idg = guru.id_guru 
            JOIN kelas ON jadwal.idk = kelas.id_kelas 
            JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
            WHERE kelas.id_kelas = ? AND hari.hari = ?
            ORDER BY jadwal.jam_mulai;`, [id_kelas, hari], (error, result) => {
                if(error){
                    console.log(error)
                    return reject(error)
                }
                resolve({data : result, count : result.length})
            })
        })
    }
}