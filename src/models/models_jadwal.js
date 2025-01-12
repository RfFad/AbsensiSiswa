const connection = require('../configs/Databases')
const jadwalmodel = {
    updateIdMapelByGuruId :  async (id_guru, idm) => {
        const query = 'UPDATE jadwal SET idm = ? WHERE idg = ?';
        return connection.query(query, [idm, id_guru]);
      },
      
getIdMapelByGuruId: async (idg) => {
        const query = 'SELECT idm FROM guru WHERE id_guru = ?';
        return new Promise((resolve, reject) => {
          connection.query(query, [idg], (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results);
          });
        });
      },
      
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
         SELECT 
    jadwal.idj,
    hari.hari AS hari,
    guru.nama_guru AS nama_guru,
    guru.idm AS mapel_ajar,
    kelas.nama_kelas AS nama_kelas,
    mata_pelajaran.nama_mp AS nama_mp,
    jadwal.jam_mulai,
    jadwal.jam_selesai
FROM 
    jadwal
JOIN 
    hari ON jadwal.idh = hari.idh
JOIN 
    guru ON jadwal.idg = guru.id_guru
JOIN 
    kelas ON jadwal.idk = kelas.id_kelas
JOIN 
    mata_pelajaran ON jadwal.idm = mata_pelajaran.idm
WHERE 
    hari.idh = 1
ORDER BY 
    CAST(SUBSTRING_INDEX(kelas.nama_kelas, ' ', 1) AS UNSIGNED) ASC,
    SUBSTRING(kelas.nama_kelas, 2) ASC,
    jadwal.jam_mulai ASC;
  `, (error, result) => {
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
         SELECT 
    jadwal.idj,
    hari.hari AS hari,
    guru.nama_guru AS nama_guru,
    guru.idm AS mapel_ajar,
    kelas.nama_kelas AS nama_kelas,
    mata_pelajaran.nama_mp AS nama_mp,
    jadwal.jam_mulai,
    jadwal.jam_selesai
FROM 
    jadwal
JOIN 
    hari ON jadwal.idh = hari.idh
JOIN 
    guru ON jadwal.idg = guru.id_guru
JOIN 
    kelas ON jadwal.idk = kelas.id_kelas
JOIN 
    mata_pelajaran ON jadwal.idm = mata_pelajaran.idm
WHERE 
    hari.idh = 2
ORDER BY 
    CAST(SUBSTRING_INDEX(kelas.nama_kelas, ' ', 1) AS UNSIGNED) ASC,
    SUBSTRING(kelas.nama_kelas, 2) ASC,
    jadwal.jam_mulai ASC;
 `, (error, result) => {
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
         SELECT 
    jadwal.idj,
    hari.hari AS hari,
    guru.nama_guru AS nama_guru,
    guru.idm AS mapel_ajar,
    kelas.nama_kelas AS nama_kelas,
    mata_pelajaran.nama_mp AS nama_mp,
    jadwal.jam_mulai,
    jadwal.jam_selesai
FROM 
    jadwal
JOIN 
    hari ON jadwal.idh = hari.idh
JOIN 
    guru ON jadwal.idg = guru.id_guru
JOIN 
    kelas ON jadwal.idk = kelas.id_kelas
JOIN 
    mata_pelajaran ON jadwal.idm = mata_pelajaran.idm
WHERE 
    hari.idh = 3
ORDER BY 
    CAST(SUBSTRING_INDEX(kelas.nama_kelas, ' ', 1) AS UNSIGNED) ASC,
    SUBSTRING(kelas.nama_kelas, 2) ASC,
    jadwal.jam_mulai ASC;
`, (error, result) => {
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
          SELECT 
    jadwal.idj,
    hari.hari AS hari,
    guru.nama_guru AS nama_guru,
    guru.idm AS mapel_ajar,
    kelas.nama_kelas AS nama_kelas,
    mata_pelajaran.nama_mp AS nama_mp,
    jadwal.jam_mulai,
    jadwal.jam_selesai
FROM 
    jadwal
JOIN 
    hari ON jadwal.idh = hari.idh
JOIN 
    guru ON jadwal.idg = guru.id_guru
JOIN 
    kelas ON jadwal.idk = kelas.id_kelas
JOIN 
    mata_pelajaran ON jadwal.idm = mata_pelajaran.idm
WHERE 
    hari.idh = 4
ORDER BY 
    CAST(SUBSTRING_INDEX(kelas.nama_kelas, ' ', 1) AS UNSIGNED) ASC,
    SUBSTRING(kelas.nama_kelas, 2) ASC,
    jadwal.jam_mulai ASC;
  `, (error, result) => {
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
 SELECT 
    jadwal.idj,
    hari.hari AS hari,
    guru.nama_guru AS nama_guru,
    guru.idm AS mapel_ajar,
    kelas.nama_kelas AS nama_kelas,
    mata_pelajaran.nama_mp AS nama_mp,
    jadwal.jam_mulai,
    jadwal.jam_selesai
FROM 
    jadwal
JOIN 
    hari ON jadwal.idh = hari.idh
JOIN 
    guru ON jadwal.idg = guru.id_guru
JOIN 
    kelas ON jadwal.idk = kelas.id_kelas
JOIN 
    mata_pelajaran ON jadwal.idm = mata_pelajaran.idm
WHERE 
    hari.idh = 5
ORDER BY 
    CAST(SUBSTRING_INDEX(kelas.nama_kelas, ' ', 1) AS UNSIGNED) ASC,
    SUBSTRING(kelas.nama_kelas, 2) ASC,
    jadwal.jam_mulai ASC;
`, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
},
 getSabtu : async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
SELECT 
    jadwal.idj,
    hari.hari AS hari,
    guru.nama_guru AS nama_guru,
    guru.idm AS mapel_ajar,
    kelas.nama_kelas AS nama_kelas,
    mata_pelajaran.nama_mp AS nama_mp,
    jadwal.jam_mulai,
    jadwal.jam_selesai
FROM 
    jadwal
JOIN 
    hari ON jadwal.idh = hari.idh
JOIN 
    guru ON jadwal.idg = guru.id_guru
JOIN 
    kelas ON jadwal.idk = kelas.id_kelas
JOIN 
    mata_pelajaran ON jadwal.idm = mata_pelajaran.idm
WHERE 
    hari.idh = 7
ORDER BY 
    CAST(SUBSTRING_INDEX(kelas.nama_kelas, ' ', 1) AS UNSIGNED) ASC,
    SUBSTRING(kelas.nama_kelas, 2) ASC,
    jadwal.jam_mulai ASC;
`, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}
}
module.exports = jadwalmodel;