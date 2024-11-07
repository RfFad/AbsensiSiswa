const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');
const Dashboard = require ('../controllers/guru/DashboardController');
const jadwal_guru = require('../controllers/guru/JadwalController');
const absen = require('../controllers/guru/AbsenController')
const rekap = require('../controllers/guru/RekapAbsenController')


router.get('/', verifyUser.isLogin, checkRole('guru'), authHeader, Dashboard.getDashboard)
router.get('/jadwal', verifyUser.isLogin, checkRole('guru'), jadwal_guru.jadwalmengajar)
router.get('/absen/:id_kelas', verifyUser.isLogin, checkRole('guru'), authHeader, absen.showAbsensiPage)
router.post('/input_absen', absen.submitAbsensi)
router.post('/update/:id_guru', Dashboard.updateGuru)
router.get('/rekap_absen/:id_kelas', rekap.rekapAbsensiKelas)
router.get('/menu_rekap', rekap.menuRekap)
router.get('/pageguru', async(req, res)=> {
    try {
        res.render("guru/newpage")
    } catch (error) {
        res.status(500).send({msg: "ada kesalahan", err : error})
    }
})

module.exports = router;