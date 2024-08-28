const mysql = require('mysql');
const gurumodel = require('../../models/guru/models_guru');

const connect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});

module.exports = {
    async getDashboard(req, res) {
        const username = req.session.username; // Assuming the username is the NIP of the guru

        try {
            const rows = await gurumodel.getguru(req, res);

            connect.getConnection(function (err, connection) {
                if (err) {
                    console.error('Database connection error:', err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }

                connection.query(
                    `SELECT * FROM guru WHERE nip = ?`, [username],
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
                            res.render('guru/index', {
                                rows,
                                guru: results[0], // Passing the guru profile data to the view
                                colorFlash: req.flash('color'),
                                statusFlash: req.flash('status'),
                                pesanFlash: req.flash('message'),
                            });
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Guru not found');
                            res.redirect('/login');
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Error in getting guru data:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },
};
