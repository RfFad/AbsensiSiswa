const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware
const jadwal_siswa = require("../controllers/siswa/SiswaController")

router.get('/', checkRole('siswa'), authHeader, async(req, res)=>{
    try {
        
        res.render('Siswa/index', {messages:"halo"})
    } catch (error) {
        res.status(400).json(error);
    }
})
router.get('/jadwal', jadwal_siswa.renderJadwal);
router.get('/data_jadwal', jadwal_siswa.dataJadwal);



module.exports = router;