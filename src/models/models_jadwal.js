const connection = require('../configs/Databases')
const jadwalmodel = {
InsertJadwal : async (idh, idg, idk, idm, jam_mulai, jam_selesai) => {
    return new Promise((resolve, reject) => {
            connection.query(`
                INSERT INTO jadwal (idh, idg, idk, idm, jam_mulai, jam_selesai) VALUES (?, ?, ?, ?, ?, ?)
            `, [idh, idg, idk, idm, jam_mulai, jam_selesai], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        
    });
},
JadwalById : async (idj) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM jadwal WHERE idj = ?    
            `, [idj], (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (result.length === 0) {
                    return reject(new Error('Jadwal tidak ditemukan'));
                }
                resolve(result[0]);
            });
    });
},
UpdateJadwal: async (idj, idh, idg, idk, idm, jam_mulai, jam_selesai) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            UPDATE jadwal 
            SET idh = ?, idg = ?, idk = ?, idm = ?, jam_mulai = ?, jam_selesai = ?
            WHERE idj = ?
        `, [idh, idg, idk, idm, jam_mulai, jam_selesai, idj], (updateError, updateResults) => {
            if (updateError) return reject(updateError);
            resolve(updateResults);
        });
    });
},
DeleteJadwal : async (idj) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM jadwal WHERE idj = ?
                    `, [idj], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
},
 getSenin : async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT jadwal.idj,hari.hari as hari, guru.nama_guru as nama_guru, kelas.nama_kelas as nama_kelas, mata_pelajaran.nama_mp as nama_mp, jadwal.jam_mulai, jadwal.jam_selesai FROM jadwal, hari, guru, kelas, mata_pelajaran WHERE jadwal.idh = hari.idh AND jadwal.idg = guru.id_guru AND jadwal.idk = kelas.id_kelas AND jadwal.idm =mata_pelajaran.idm AND hari.idh = 1 ORDER BY jadwal.jam_mulai  `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
},
 getSelasa : async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT jadwal.idj,hari.hari as hari, guru.nama_guru as nama_guru, kelas.nama_kelas as nama_kelas, mata_pelajaran.nama_mp as nama_mp, jadwal.jam_mulai, jadwal.jam_selesai FROM jadwal, hari, guru, kelas, mata_pelajaran WHERE jadwal.idh = hari.idh AND jadwal.idg = guru.id_guru AND jadwal.idk = kelas.id_kelas AND jadwal.idm =mata_pelajaran.idm AND hari.idh = 2 ORDER BY jadwal.jam_mulai  `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
},
 getRabu : async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT jadwal.idj,hari.hari as hari, guru.nama_guru as nama_guru, kelas.nama_kelas as nama_kelas, mata_pelajaran.nama_mp as nama_mp, jadwal.jam_mulai, jadwal.jam_selesai FROM jadwal, hari, guru, kelas, mata_pelajaran WHERE jadwal.idh = hari.idh AND jadwal.idg = guru.id_guru AND jadwal.idk = kelas.id_kelas AND jadwal.idm =mata_pelajaran.idm AND hari.idh = 3 ORDER BY jadwal.jam_mulai  `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
},
 getKamis : async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT jadwal.idj,hari.hari as hari, guru.nama_guru as nama_guru, kelas.nama_kelas as nama_kelas, mata_pelajaran.nama_mp as nama_mp, jadwal.jam_mulai, jadwal.jam_selesai FROM jadwal, hari, guru, kelas, mata_pelajaran WHERE jadwal.idh = hari.idh AND jadwal.idg = guru.id_guru AND jadwal.idk = kelas.id_kelas AND jadwal.idm =mata_pelajaran.idm AND hari.idh = 4 ORDER BY jadwal.jam_mulai  `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
},
 getJumat : async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT jadwal.idj,hari.hari as hari, guru.nama_guru as nama_guru, kelas.nama_kelas as nama_kelas, mata_pelajaran.nama_mp as nama_mp, jadwal.jam_mulai, jadwal.jam_selesai FROM jadwal, hari, guru, kelas, mata_pelajaran WHERE jadwal.idh = hari.idh AND jadwal.idg = guru.id_guru AND jadwal.idk = kelas.id_kelas AND jadwal.idm =mata_pelajaran.idm AND hari.idh = 5 ORDER BY jadwal.jam_mulai  `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}
}
module.exports = jadwalmodel;