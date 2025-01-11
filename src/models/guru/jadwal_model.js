const connection = require('../../configs/Databases');

const jadwalmodel = {
    updateIdMapelByGuruId : async (id_guru, idm) => {
        const query = 'UPDATE jadwal SET idm = ? WHERE idg = ?';
        return db.query(query, [idm, id_guru]);
      },
      
    getJadwal: async (req, res) => {
        const id_guru = req.session.username;
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT  jadwal.idj, 
       hari.hari AS hari, 
       guru.nama_guru AS nama_guru, 
       guru.nip AS nip, 
       kelas.nama_kelas AS nama_kelas, 
       kelas.id_kelas AS id_kelas, 
       mata_pelajaran.nama_mp AS nama_mp, 
       jadwal.jam_mulai, 
       jadwal.jam_selesai 
FROM jadwal 
JOIN hari ON jadwal.idh = hari.idh 
JOIN guru ON jadwal.idg = guru.id_guru 
JOIN kelas ON jadwal.idk = kelas.id_kelas 
JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
WHERE guru.nip = ? 
ORDER BY hari.idh ASC, jadwal.jam_mulai ASC;

            `, [id_guru], (error, result) => {
                if (error) {
                    return reject(error);
                }
                // Resolving with an object that contains both the results and their length
                resolve({ results: result, count: result.length });
            });
        });
    },

    

    jadwalById: async (idj) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT jadwal.idj, jadwal.idk AS id_kelas, hari.hari AS hari, guru.nama_guru AS nama_guru, 
                       guru.nip AS nip, kelas.nama_kelas AS nama_kelas, mata_pelajaran.nama_mp AS nama_mp, 
                       jadwal.jam_mulai, jadwal.jam_selesai 
                FROM jadwal 
                JOIN hari ON jadwal.idh = hari.idh 
                JOIN guru ON jadwal.idg = guru.id_guru 
                JOIN kelas ON jadwal.idk = kelas.id_kelas 
                JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
                WHERE idj = ?;
            `, [idj], (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (result.length === 0) {
                    return reject(new Error('Jadwal Tidak Ditemukan'));
                }
                resolve(result[0]);
            });
        });
    },

    getHariId: async (today) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM hari WHERE hari = ?", [today], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length === 0) {
                    return reject(new Error('Hari Tidak Ditemukan'));
                }
                resolve(result[0]);
            });
        });
    },

    activateJadwal: async (id_hari, now) => {
        return new Promise((resolve, reject) => {
            // Activate the jadwal for the current day and time
            connection.query(
                "UPDATE jadwal SET aktif = 1 WHERE idh = ? AND jam_mulai <= ? AND jam_selesai >= ?",
                [id_hari, now, now],
                (err) => {
                    if (err) return reject(err);

                    // Deactivate all other schedules not for the current day
                    connection.query(
                        "UPDATE jadwal SET aktif = 0 WHERE idh <> ?",
                        [id_hari],
                        (err) => {
                            if (err) return reject(err);

                            // Deactivate schedules outside the current time range
                            connection.query(
                                "UPDATE jadwal SET aktif = 0 WHERE idh = ? AND (jam_mulai > ? OR jam_selesai < ?)",
                                [id_hari, now, now],
                                (err) => {
                                    if (err) return reject(err);
                                    resolve();
                                }
                            );
                        }
                    );
                }
            );
        });
    },

    getJadwalById: async (idj) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT jadwal.*, mata_pelajaran.nama_mp as nama_mp, kelas.nama_kelas as nama_kelas FROM jadwal JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm JOIN kelas ON jadwal.idk = kelas.id_kelas WHERE idj = ?;", [idj], (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('Jadwal Tidak Ditemukan'));
                }
                resolve(result[0]);
            });
        });
    }
};

module.exports = jadwalmodel;
