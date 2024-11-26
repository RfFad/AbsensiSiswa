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
     getUnreadNotifications : async (nis) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT notifications_riwayat.*, siswa.nama_siswa, siswa.nis  FROM notifications_riwayat INNER JOIN siswa ON notifications_riwayat.id_siswa = siswa.id_siswa WHERE siswa.nis = ? AND notifications_riwayat.is_read = FALSE
            `, [nis], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
     markNotificationsAsRead : async (id_siswa) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE notifications_riwayat SET is_read = 1 WHERE id_siswa = ?
            `, [id_siswa], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
    inbox : async (nis) => {
        return new Promise((resolve, reject) =>{
            connection.query(` SELECT notifications_riwayat.*, sekolah.nama AS nama_sekolah, siswa.nis FROM notifications_riwayat INNER JOIN siswa ON notifications_riwayat.id_siswa = siswa.id_siswa INNER JOIN sekolah ON notifications_riwayat.id_sekolah = sekolah.id_sekolah WHERE siswa.nis = ? ORDER BY notifications_riwayat.created_at DESC`, [nis], (error, result) =>{
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    inboxNotif : async (nis) => {
        return new Promise((resolve, reject) =>{
            connection.query(` SELECT notifications_riwayat.*, sekolah.nama AS nama_sekolah, siswa.nis FROM notifications_riwayat INNER JOIN siswa ON notifications_riwayat.id_siswa = siswa.id_siswa INNER JOIN sekolah ON notifications_riwayat.id_sekolah = sekolah.id_sekolah WHERE siswa.nis = ? AND notifications_riwayat.is_read = 0`, [nis], (error, result) =>{
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    DeleteNotif : async(id_notif) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM notifications_riwayat WHERE id = ?`, [id_notif], (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    }
    
}

module.exports = siswamodel