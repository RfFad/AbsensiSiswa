const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware

const controllerSiswa = require("../controllers/siswa/SiswaController")
const izin = require('../controllers/izinController')
const {getDashboard, nontifikasi, unnotif, countNotif} = require ('../controllers/siswa/DashboardController');


router.get('/', verifyUser.isLogin, checkRole('siswa'), authHeader, getDashboard)

router.get('/message', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.message)
router.get('/jadwal', verifyUser.isLogin, checkRole('siswa'), authHeader,controllerSiswa.renderJadwal);
router.get('/data_jadwal', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.dataJadwal);
router.get('/menu_rekap', verifyUser.isLogin, checkRole('siswa'), authHeader , controllerSiswa.menuJadwal)
router.get('/rekap_absen', verifyUser.isLogin, checkRole('siswa'), authHeader , controllerSiswa.Absen);
router.get('/tugas', verifyUser.isLogin, checkRole('siswa'), authHeader , controllerSiswa.tugasPage);
router.get('/data_tugas/:id_kelas', verifyUser.isLogin, checkRole('siswa'), authHeader, checkRole('siswa'), authHeader , controllerSiswa.tugasData);
router.get('/tugas_detail/:id_tugas', verifyUser.isLogin, checkRole('siswa'), authHeader, checkRole('siswa'), authHeader , controllerSiswa.tugasByid);
router.post('/kirim_tugas', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.uploadTugas);
router.get('/detailJawaban/:id_tugas/:id_siswa', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.detailJawaban);
router.get('/data_nilai', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.nilaiSiswa);
router.get('/jawaban/:id_tugas/:id_siswa', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.jawaban_Siswa);
router.post('/update_jawaban/:id_pengumpulan', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.editJawabanSiswa);
router.get('/riwayat', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.riwayat)
router.get('/data_riwayat', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.riwayatSiswa)
router.get('/nontifikasi', verifyUser.isLogin, checkRole('siswa'), authHeader, nontifikasi)
router.post('/unnotif/:id_siswa', verifyUser.isLogin, checkRole('siswa'), authHeader, unnotif)
router.post('/insert_izin', verifyUser.isLogin, checkRole('siswa'), authHeader, izin.insertIzin);
router.get('/izin', verifyUser.isLogin, checkRole('siswa'), authHeader, izin.dataIzin);
router.get('/detail_izin/:id_izin', verifyUser.isLogin, checkRole('siswa'), authHeader, izin.izin_detailSiswa)
router.post('/hapus_izin/:id_izin', verifyUser.isLogin, checkRole('siswa'), authHeader, izin.Izinhapus)
router.get('/data_notif', verifyUser.isLogin, checkRole('siswa'), authHeader, countNotif)
router.post('/hapus_notif/:id_notif', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.hapus_notif)
router.get('/detail_riwayat/:id_riwayat', verifyUser.isLogin, checkRole('siswa'), authHeader, controllerSiswa.riwayatDetail)


module.exports = router;