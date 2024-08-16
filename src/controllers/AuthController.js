const connect = require('../configs/Databases');
const jwt = require('jsonwebtoken');


module.exports = {
    login(req, res) {
        res.render("login", {
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },

    async loginAuth(req, res) {
        let nis = req.body.username;
        let password = req.body.password;
    
        if (nis && password) {
            connect.beginTransaction(function (err, connection) {
                if (err) {
                    console.error('Database connection error:', err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }
    
                console.log('Executing query: SELECT * FROM auth WHERE username = ?', nis);
    
                connect.query(
                    `SELECT * FROM auth WHERE username = ? and password = ?`,
                    [nis, password],
                    function (error, results) {
                        if (error) {
                            connection.release();
                            console.error(error);
                            return res.status(500).json({
                                status: 'error',
                                message: 'Internal server error'
                            });
                        }
    
                        if (results.length > 0) {
                            const tokenPayload = {
                                nis: results[0].nis,
                                role: results[0].role // Fixed this line to access role correctly
                            };
    
                            const accessToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: "1h" });
    
                            req.session.loggedin = true;
                            req.session.nis = tokenPayload.nis;
                            req.session.role = tokenPayload.role;
    
                            res.cookie('token', accessToken, { httpOnly: true });
    
                            // Redirect based on user role
                            if (req.session.role === 'admin') {
                                res.redirect('/admin');
                            } else if (req.session.role === 'siswa') {
                                res.redirect('/siswa');
                            } else {
                                // Default redirect if role is not recognized
                                res.redirect('/login');
                            }
    
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Akun tidak ditemukan');
                            res.redirect('/login');
                        }
    
                        connect.commit();
                    }
                );
            });
        } else {
            req.flash('color', 'danger');
            req.flash('status', 'Oops..');
            req.flash('message', 'Username dan password harus diisi');
            res.redirect('/login');
        }
    },
    

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
            }
            res.clearCookie('token');
            res.redirect('/login');
        });
    },

    refreshToken(req, res) {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        jwt.verify(token, 'SECRET', (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Failed to authenticate token'
                });
            }

            const newTokenPayload = {
                nis: decoded.nis,
                role: decoded.role,
            };

            const newAccessToken = jwt.sign(newTokenPayload, 'SECRET', { expiresIn: "1h" });

            res.cookie('token', newAccessToken, { httpOnly: true });

            res.json({
                status: 'success',
                message: 'Token refreshed successfully',
                data: {
                    accessToken: newAccessToken,
                },
            });
        });
    },

    // Role-based middleware
    checkRole(role) {
        return (req, res, next) => {
            if (req.session.role !== role) {
                req.flash('color', 'danger');
                req.flash('status', 'Oops..');
                req.flash('message', 'You do not have permission to access this page');
                return res.redirect('/login');
            }
            next();
        };
    }
};
