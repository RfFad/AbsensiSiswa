const mysql = require('mysql');
const siswamodel = require('../../models/siswa/models_siswa');
const {getSekolah} = require('../../models/models_sekolah');
const izin = require('../../models/models_izin')
const notif = require('../../models/siswa/models_siswa')

const connect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});


module.exports = {
    async getDashboard(req, res) {
        const username = req.session.username; // Assuming the username is the nis of the siswa
         // Assuming the username is the nis of the siswa

        try {
            const sekolah = await getSekolah();
            const rows = await siswamodel.getsiswa(req, res);
            

            //const { results, count } = await jadwal.getJadwal(req, res);
            connect.getConnection(function (err, connection) {
                if (err) {
                    console.error('Database connection error:', err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }

                connection.query(
                    `SELECT * FROM siswa WHERE nis = ?`, [username],
                    function (error, results) {
                        connection.release();
                        if (error) {
                            console.error(error);
                            return res.status(500).json({
                                status: 'error',
                                message: 'Internal server error'
                            });
                        }

                        if (results.length > 0) {
                            res.render('siswa/newpage', {
                                currentPath: '/siswa' ,
                                rows,
                                sekolah,
                                //jdwl : count,
                                siswa: results[0], // Passing the siswa profile data to the view
                                colorFlash: req.flash('color'),
                                statusFlash: req.flash('status'),
                                pesanFlash: req.flash('message'),
                            });
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'siswa not found');
                            res.redirect('/login');
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Error in getting siswa data:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },
    async nontifikasi(req, res) {
        const nis = req.session.username;
        try {
            const unreadNotifications = await siswamodel.getUnreadNotifications(nis);
            res.status(200).json({notifications : unreadNotifications})
        } catch (error) {
            console.log(error);
            res.status(404)

        }
    },
    async unnotif(req, res){
        const {id_siswa} = req.params;
        try {
            await siswamodel.markNotificationsAsRead(id_siswa)
            res.status(200).json({messages: "berhasil"})
        } catch (error) {
            console.log(error)
            res.status(404).json(error)
        }
    },
    async countNotif(req, res) {
        const nis = req.session.username; // Mengambil `nis` dari sesi
        try {
            // Mengambil data izin dan notifikasi untuk siswa
            const dataIzin = await izin.izinSiswa(nis);
            const dataNotif = await notif.inboxNotif(nis);
    
            
            const jumlahNotif = dataNotif.length + dataIzin.length;
    
            // Mengembalikan data sebagai JSON
            res.status(202).json({ jumlahNotif, dataNotif});
        } catch (error) {
            console.error(error); // Logging error untuk debugging
            res.status(500).json({ error: "Terjadi kesalahan saat menghitung notifikasi." });
        }
    }
    
};
