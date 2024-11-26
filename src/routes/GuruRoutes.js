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
router.post('/input_absen', absen.submitAbsensi)
router.post('/update/:id_guru', Dashboard.updateGuru)
router.get('/rekap_absen/:id_kelas', rekap.rekapAbsensiKelas)
router.get('/menu_rekap', rekap.menuRekap)
router.get('/data_siswa', Dashboard.getPageSiswa)
router.get('/list_siswa',Dashboard.getSiswa);
router.post('/input_tugas', Tugas.tugasInput);
router.get('/data_tugas', Tugas.dataTugas)
router.get('/tugas', Tugas.tugasPage);
router.get('/tugasByid/:id_tugas',Tugas.tugasByid);
router.post('/update_tugas/:id_tugas', Tugas.tugasUpdate);
router.get('/tugas_detail/:id_tugas', Tugas.tugasDetail)
router.get('/pengumpulan_tugas/:id_tugas', Tugas.pengumpulanTugas)
router.get('/nilai_detail/:id_pengumpulan', Tugas.nilaiDetail)
router.get('/jawaban_siswa/:id_pengumpulan', Tugas.jawaban_Siswa)
router.post('/input_nilai/:id_pengumpulan', Tugas.inputNilai);
router.get('/notif_izin', izin.notif_izin)
router.get('/permintaan_izin', izin.data_izin)
router.get('/detail_izin/:id_izin', izin.izin_detail)
router.post('/read/:id_guru', izin.read)
router.get('/setujui/:id_izin', izin.setujuiIzin)
router.get('/tolak/:id_izin', izin.tolakIzin)
router.get('/countIzin', izin.pesanCount)
router.get('/riwayat_siswa/:nis', Dashboard.riwayatSiswa)
//router.get('/riwayat', Dashboard.dataRiwayat)

router.post('/hapusTugas/:id_tugas', Tugas.deleteTugas)
module.exports = router;