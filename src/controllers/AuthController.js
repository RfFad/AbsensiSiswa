const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const md5 = require('md5');
const {getSekolah} = require('../models/models_sekolah') // Import the MD5 module

const connect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});

module.exports = {
   async login(req, res) {
        try {
            const sekolah = await getSekolah();
        res.render("login", {
            sekolah,
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
        } catch (error) {
            console.error('Error in getting data:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'})
        }
        
    },

    async loginAuth(req, res) {
        let username = req.body.username;
        let password = md5(req.body.password); // Hash the password using MD5
    
        if (username && password) {
            connect.getConnection(function (err, connection) {
                if (err) {
                    console.error('Database connection error:', err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }
    
                connection.query(
                    `SELECT * FROM user WHERE username = ? AND password = ?`,
                    [username, password],
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
                                username: results[0].username,
                                role: results[0].role,
                                
                            };
    
                            const accessToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: "1h" });
    
                            req.session.loggedin = true;
                            req.session.username = tokenPayload.username;
                            req.session.role = tokenPayload.role;
                            
    
                            res.cookie('token', accessToken, { httpOnly: true });
                            
                            res.redirect('/admin');
                        } else {
                            // If not found in `auth`, check `siswa`
                            connection.query(
                                `SELECT * FROM siswa WHERE nis = ? AND password = ?`,
                                [username, password],
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
                                            username: results[0].nis,
                                            role: 'siswa',
                                            id_kelas: results[0].id_kelas
                                        };
    
                                        const accessToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: "1h" });
    
                                        req.session.loggedin = true;
                                        req.session.username = tokenPayload.username;
                                        req.session.role = tokenPayload.role;
                                        req.session.id_kelas = tokenPayload.id_kelas;
    
                                        res.cookie('token', accessToken, { httpOnly: true });
                                        res.redirect('/siswa');
                                    } else {
                                        // If not found in `siswa`, check `guru`
                                        connection.query(
                                            `SELECT * FROM guru WHERE nip = ? AND password = ?`,
                                            [username, password],
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
                                                    const tokenPayload = {
                                                        username: results[0].nip,
                                                        role: 'guru'
                                                    };
        
                                                    const accessToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: "1h" });
        
                                                    req.session.loggedin = true;
                                                    req.session.username = tokenPayload.username;
                                                    req.session.role = tokenPayload.role;
        
                                                    res.cookie('token', accessToken, { httpOnly: true });
                                                    res.redirect('/guru');
                                                } else {
                                                    req.flash('color', 'danger');
                                                    req.flash('status', 'Oops..');
                                                    req.flash('message', 'Username or password is incorrect');
                                                    res.redirect('/login');
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                        
                    }
                    
                );//
                
            });
        } else {
            req.flash('color', 'danger');
            req.flash('status', 'Oops..');
            req.flash('message', 'Username and password must be filled in');
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
                username: decoded.username,
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

    checkRole(role) {
        return (req, res, next) => {
            if (req.session.role !== role) {
                req.flash('color', 'danger');
                req.flash('status', 'Oops..');
                req.flash('message', 'You do not have permission to access this page');
                if(req.session.role === 'admin'){
                    return res.redirect('/admin');
                }else if(req.session.role === 'guru'){
                    return res.redirect('/guru');
                }else{
                    return res.redirect('/siswa');
                }
            }
            next();
        };
    }
};
