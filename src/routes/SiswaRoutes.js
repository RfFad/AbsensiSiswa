const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware

const controllerSiswa = require("../controllers/siswa/SiswaController")
const izin = require('../controllers/izinController')
const {getDashboard, nontifikasi, unnotif, countNotif} = require ('../controllers/siswa/DashboardController');


router.get('/', checkRole('siswa'), authHeader, getDashboard)

router.get('/message', checkRole('siswa'), authHeader, controllerSiswa.message)
router.get('/jadwal', checkRole('siswa'), authHeader,controllerSiswa.renderJadwal);
router.get('/data_jadwal', checkRole('siswa'), authHeader, controllerSiswa.dataJadwal);
router.get('/menu_rekap', checkRole('siswa'), authHeader , controllerSiswa.menuJadwal)
router.get('/rekap_absen', checkRole('siswa'), authHeader , controllerSiswa.Absen);
router.get('/tugas', checkRole('siswa'), authHeader , controllerSiswa.tugasPage);
router.get('/data_tugas/:id_kelas', checkRole('siswa'), authHeader, checkRole('siswa'), authHeader , controllerSiswa.tugasData);
router.get('/tugas_detail/:id_tugas', checkRole('siswa'), authHeader, checkRole('siswa'), authHeader , controllerSiswa.tugasByid);
router.post('/kirim_tugas', checkRole('siswa'), authHeader, controllerSiswa.uploadTugas);
router.get('/detailJawaban/:id_tugas/:id_siswa', checkRole('siswa'), authHeader, controllerSiswa.detailJawaban);
router.get('/data_nilai', checkRole('siswa'), authHeader, controllerSiswa.nilaiSiswa);
router.get('/jawaban/:id_tugas/:id_siswa', checkRole('siswa'), authHeader, controllerSiswa.jawaban_Siswa);
router.post('/update_jawaban/:id_pengumpulan', checkRole('siswa'), authHeader, controllerSiswa.editJawabanSiswa);
router.get('/riwayat', checkRole('siswa'), authHeader, controllerSiswa.riwayat)
router.get('/data_riwayat', checkRole('siswa'), authHeader, controllerSiswa.riwayatSiswa)
router.get('/nontifikasi', checkRole('siswa'), authHeader, nontifikasi)
router.post('/unnotif/:id_siswa', checkRole('siswa'), authHeader, unnotif)
router.post('/insert_izin', checkRole('siswa'), authHeader, izin.insertIzin);
router.get('/izin', checkRole('siswa'), authHeader, izin.dataIzin);
router.get('/detail_izin/:id_izin', checkRole('siswa'), authHeader, izin.izin_detailSiswa)
router.post('/hapus_izin/:id_izin', checkRole('siswa'), authHeader, izin.Izinhapus)
router.get('/data_notif', checkRole('siswa'), authHeader, countNotif)
router.post('/hapus_notif/:id_notif', checkRole('siswa'), authHeader, controllerSiswa.hapus_notif)
router.get('/detail_riwayat/:id_riwayat', checkRole('siswa'), authHeader, controllerSiswa.riwayatDetail)


module.exports = router;