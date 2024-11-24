const { resolve } = require('path');
const db = require('../../configs/Databases');
const { error } = require('console');

const Attendance = {
    // getSiswaByKelas: (id_kelas) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT * FROM siswa WHERE id_kelas = ?`, [id_kelas], (error, results) => {
    //             if (error) {
    //                 return reject(error);
    //             }
    //             resolve(results);
    //         });
    //     });
    // },
    // getAttendanceByDateAndJadwal: (ids, idj, tgl) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT * FROM absen WHERE ids = ? AND tgl = ? AND idj = ?`, [ids, tgl, idj], (err, results) => {
    //             if (err) return reject(err);
    //             resolve(results[0]);
    //         });
    //     });
    // },
    // InsertAbsen: (ids, idj, tgl, ket) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`INSERT INTO absen (ids, idj, tgl, ket) VALUES (?, ?, ?, ?)`, [ids, idj, tgl, ket], (error, results) => {
    //             if (error) {
    //                 return reject(error);
    //             }
    //             resolve(results);
    //         });
    //     });
    // },
    saveAbsen: (entries) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO absen (id_absen, id_siswa, id_kelas, id_jadwal, id_guru, tanggal, status)
                VALUES ?
                ON DUPLICATE KEY UPDATE 
                    
                    id_siswa = VALUES(id_siswa),
                    id_kelas = VALUES(id_kelas),
                    id_jadwal = VALUES(id_jadwal),
                    id_guru = VALUES(id_guru),
                    tanggal = VALUES(tanggal),
                    status = VALUES(status)
            `;
    
            db.query(query, [entries], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
    
,    
    absenDetail : async( tanggal, id_jadwal) =>{
        return new Promise((resolve, reject) =>{
            db.query(`
                SELECT * FROM absen WHERE tanggal = ? AND id_jadwal = ?
                `, [tanggal, id_jadwal], (error, result) => {
                    if(error) {
                        return reject(error)

                    }
                    resolve(result)
                })
        })
    },
    dataSiswaByid_kelas: (id_kelas) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT siswa.*, kelas.nama_kelas AS nama_kelas, tahun_ajaran.nama_ajaran AS nama_ajaran 
                 FROM siswa 
                 JOIN kelas ON siswa.id_kelas = kelas.id_kelas 
                 JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth 
                 WHERE siswa.id_kelas = ?`, 
                [id_kelas], 
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },    
    dataSiswaByid_kelas: (id_kelas) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT siswa.*, kelas.nama_kelas AS nama_kelas, tahun_ajaran.nama_ajaran AS nama_ajaran 
                 FROM siswa 
                 JOIN kelas ON siswa.id_kelas = kelas.id_kelas 
                 JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth 
                 WHERE siswa.id_kelas = ?`, 
                [id_kelas], 
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    getJadwalById: (id_jadwal) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT jadwal.*, mata_pelajaran.nama_mp AS nama_mp, kelas.nama_kelas AS nama_kelas 
                FROM jadwal 
                JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
                JOIN kelas ON jadwal.idk = kelas.id_kelas 
                WHERE idj = ?;
            `;
            db.query(query, [id_jadwal], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) {
                    return reject(new Error('Jadwal Tidak Ditemukan'));
                }
                resolve(results[0]);
            });
        });
    }
    
    
       
    // updateAbsen: (ket, ids, tgl, idj) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`UPDATE absen SET ket = ? WHERE ids = ? AND tgl = ? AND idj = ?`, [ket, ids, tgl, idj], (error, results) => {
    //             if (error) {
    //                 return reject(error);
    //             }
    //             resolve(results);
    //         });
    //     });
    // },
    // saveAttendance: (attendanceData) => {
    //     return new Promise((resolve, reject) => {
    //         const queries = attendanceData.map(({ ids, tanggal, idj, ket }) => {
    //             return mysql.format('REPLACE INTO absen (ids, tanggal, idj, ket) VALUES (?, ?, ?, ?)', [ids, tanggal, idj, ket]);
    //         }).join('; ');

    //         connection.query(queries, (err, results) => {
    //             if (err) reject(err);
    //             resolve(results);
    //         });
    //     });
    // }
};

module.exports = Attendance;
