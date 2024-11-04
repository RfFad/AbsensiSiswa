const mysql = require('mysql');
const siswamodel = require('../../models/siswa/models_siswa');

const connect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});


module.exports = {
    async getDashboard(req, res) {
        const username = req.session.username; // Assuming the username is the nis of the siswa

        try {
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
};
