const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware
const {profile} = require('../controllers/ProfileController')

router.get('/', checkRole('siswa'), authHeader, verifyUser.isLogin, (req, res) => {
    try {
        res.render('Siswa/index');
    } catch (error) {
        res.status(404).send(error);
    }
})
router.get('/profile', checkRole('siswa'), authHeader, verifyUser.isLogin, profile, (req, res) => {
    try {
        res.render('siswa/profile')
    } catch (error) {
        res.status(404).send(error);
    }
})



module.exports = router;