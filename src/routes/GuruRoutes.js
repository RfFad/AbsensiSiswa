const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');
const {getDashboard} = require ('../controllers/guru/DashboardController');
const jadwal_guru = require('../controllers/guru/JadwalController');
const absen = require('../controllers/guru/AbsenController')



router.get('/', checkRole('guru'), authHeader, getDashboard)
router.get('/jadwal', checkRole('guru'), jadwal_guru.jadwalmengajar)
router.get('/absen/:idj/:id_kelas', absen.getabsenbyid)
router.post('/input_absen', absen.inputAbsen)

module.exports = router;