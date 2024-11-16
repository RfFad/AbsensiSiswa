const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware

const controllerSiswa = require("../controllers/siswa/SiswaController")

const {getDashboard} = require ('../controllers/siswa/DashboardController');



router.get('/', checkRole('siswa'), authHeader, getDashboard)

router.get('/pagesiswa', async(req, res)=> {
    try {
        res.render("siswa/newpage")
    } catch (error) {
        res.status(500).send({msg: "ada kesalahan", err : error})
    }
})
router.get('/jadwal', checkRole('siswa'), authHeader ,controllerSiswa.renderJadwal);
router.get('/data_jadwal', checkRole('siswa'), authHeader, controllerSiswa.dataJadwal);
router.get('/menu_rekap', checkRole('siswa'), authHeader , controllerSiswa.menuJadwal)
router.get('/rekap_absen', checkRole('siswa'), authHeader , controllerSiswa.Absen);
router.get('/tugas', checkRole('siswa'), authHeader , controllerSiswa.tugasPage);
router.get('/data_tugas/:id_kelas', checkRole('siswa'), authHeader , controllerSiswa.tugasData);
router.get('/tugas_detail/:id_tugas', checkRole('siswa'), authHeader , controllerSiswa.tugasByid);
router.post('/kirim_tugas', controllerSiswa.uploadTugas);
router.get('/detailJawaban/:id_tugas/:id_siswa', controllerSiswa.detailJawaban);
router.get('/data_nilai', controllerSiswa.nilaiSiswa);
router.get('/jawaban/:id_tugas/:id_siswa', controllerSiswa.jawaban_Siswa);
router.post('/update_jawaban/:id_pengumpulan', controllerSiswa.editJawabanSiswa);
router.get('/riwayat', controllerSiswa.riwayat)
router.get('/data_riwayat', controllerSiswa.riwayatSiswa)


module.exports = router;