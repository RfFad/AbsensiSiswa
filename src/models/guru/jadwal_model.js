const connection = require('../../configs/Databases')
const jadwalmodel = {
    getJadwal : async (req, res) => {
        const id_guru = req.session.username
        return new Promise((resolve, reject) => {
            connection.query(`
             SELECT jadwal.idj, hari.hari as hari, guru.nama_guru as nama_guru, guru.nip as nip, kelas.nama_kelas as nama_kelas, mata_pelajaran.nama_mp as nama_mp, jadwal.jam_mulai, jadwal.jam_selesai FROM jadwal JOIN hari ON jadwal.idh = hari.idh JOIN guru ON jadwal.idg = guru.id_guru JOIN kelas ON jadwal.idk = kelas.id_kelas JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm WHERE guru.nip = '${id_guru}' ORDER BY jadwal.jam_mulai;`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    },
}

module.exports = jadwalmodel