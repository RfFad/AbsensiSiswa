const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');
const Dashboard = require ('../controllers/guru/DashboardController');
const jadwal_guru = require('../controllers/guru/JadwalController');
const absen = require('../controllers/guru/AbsenController')
const rekap = require('../controllers/guru/RekapAbsenController')
const Tugas = require('../controllers/guru/TugasController')
const izin = require ('../controllers/izinController')

router.get('/', verifyUser.isLogin, checkRole('guru'), authHeader, Dashboard.getDashboard)
router.get('/jadwal', verifyUser.isLogin, checkRole('guru'), jadwal_guru.jadwalmengajar)
router.get('/absen/:id_kelas', verifyUser.isLogin, checkRole('guru'), authHeader, absen.showAbsensiPage)
router.post('/input_absen', verifyUser.isLogin, checkRole('guru'), authHeader, absen.submitAbsensi,)
router.post('/update/:id_guru', verifyUser.isLogin, checkRole('guru'), authHeader, Dashboard.updateGuru)
router.get('/rekap_absen/:id_kelas', verifyUser.isLogin, checkRole('guru'), authHeader, rekap.rekapAbsensiKelas)
router.get('/menu_rekap', verifyUser.isLogin, checkRole('guru'), authHeader, rekap.menuRekap)
router.get('/data_siswa', verifyUser.isLogin, checkRole('guru'), authHeader, Dashboard.getPageSiswa)
router.get('/list_siswa', verifyUser.isLogin, checkRole('guru'), authHeader,Dashboard.getSiswa);
router.post('/input_tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.tugasInput);
router.get('/data_tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.dataTugas)
router.get('/tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.tugasPage);
router.get('/tugasByid/:id_tugas', verifyUser.isLogin, checkRole('guru'), authHeader,Tugas.tugasByid);
router.post('/update_tugas/:id_tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.tugasUpdate);
router.get('/tugas_detail/:id_tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.tugasDetail)
router.get('/pengumpulan_tugas/:id_tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.pengumpulanTugas)
router.get('/nilai_detail/:id_pengumpulan', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.nilaiDetail)
router.get('/jawaban_siswa/:id_pengumpulan', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.jawaban_Siswa)
router.post('/input_nilai/:id_pengumpulan', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.inputNilai);
router.get('/notif_izin', verifyUser.isLogin, checkRole('guru'), authHeader, izin.notif_izin)
router.get('/permintaan_izin', verifyUser.isLogin, checkRole('guru'), authHeader, izin.data_izin)
router.get('/detail_izin/:id_izin', verifyUser.isLogin, checkRole('guru'), authHeader, izin.izin_detail)
router.post('/read/:id_guru', verifyUser.isLogin, checkRole('guru'), authHeader, izin.read)
router.get('/setujui/:id_izin', verifyUser.isLogin, checkRole('guru'), authHeader, izin.setujuiIzin)
router.get('/tolak/:id_izin', verifyUser.isLogin, checkRole('guru'), authHeader, izin.tolakIzin)
router.get('/countIzin', verifyUser.isLogin, checkRole('guru'), authHeader, izin.pesanCount)
router.get('/riwayat_siswa/:nis', verifyUser.isLogin, checkRole('guru'), authHeader, Dashboard.riwayatSiswa)
//router.get('/riwayat', verifyUser.isLogin, checkRole('guru'), authHeader, Dashboard.dataRiwayat)

router.post('/hapusTugas/:id_tugas', verifyUser.isLogin, checkRole('guru'), authHeader, Tugas.deleteTugas)
module.exports = router;