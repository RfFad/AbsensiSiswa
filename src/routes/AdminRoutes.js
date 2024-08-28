const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware')  // assuming authHeader is another middleware
// const {getInsertSiswa, pageInsert} = require('../controllers/AdminCrudController')
const {getPageKelas, getInsertKelas, getDataKelas, getUpdateKelas, getUpdatePageKelas, getDeleteKelas} = require('../controllers/admin/KelasController')
const {getInsertGuru, getPageGuru, getGuruData, getUpdatePage, updateGuru, getDeleteGuru} = require ('../controllers/admin/GuruController')
const{getCountData} = require ('../controllers/admin/CountAdminController');
const {getInsertMapel, getDataMapel, getPageMapel, getUpdateMapel, getUpdatePageMapel, getDeleteMapel} = require('../controllers/admin/MapelController')
const {getInsertHari, getPageHari, getDataHari, getDeleteHari, getUpdateHari, getUpdatePageHari} = require ('../controllers/admin/HariController');
// const {getInsertHari, getPageHari} = require ('../controllers/admin/HariController');
const { getInsertSiswa, getPageSiswa, getSiswaData, getUpdatePageSiswa, updateSiswa, getDeleteSiswa } = require('../controllers/admin/SiswaController') 
const {getUpdatePageSekolah, updateSekolahData, getDataSekolah} = require('../controllers/admin/SekolahController')
const jadwal = require ('../controllers/admin/JadwalController')

//router
router.get('/', checkRole('admin'), authHeader, getCountData)

// //
// router.get('/insert_siswa', pageInsert)
// router.post('/create_siswa', getInsertSiswa)
//kelas
router.get('/kelas', getPageKelas);
router.post('/insert_kelas', getInsertKelas);
router.get('/data_kelas', getDataKelas);
router.get('/kelas/edit/:id_kelas', getUpdatePageKelas);
router.post('/kelas/delete/:id_kelas', getDeleteKelas);
router.post('/kelas/update/:id_kelas', getUpdateKelas);
//Mapel
router.get('/data_mapel', getDataMapel);
router.get('/mapel/create', getPageMapel);
router.post('/mapel/create', getInsertMapel);
router.get('/mapel/edit/:idm', getUpdatePageMapel);
router.post('/mapel/update/:idm', getUpdateMapel);
router.post('/mapel/delete/:idm', getDeleteMapel);
//guru
router.get('/guru', getPageGuru);
router.get('/data_guru', getGuruData)
router.post('/insert_guru', getInsertGuru);
router.get('/guru/edit/:id_guru', getUpdatePage)
router.post('/guru/update/:id_guru', updateGuru);
router.post('/guru/delete/:id_guru', getDeleteGuru);
//hari
router.get('/hari', getPageHari);
router.post('/hari/create', getInsertHari);

router.get('/data_hari', getDataHari);
router.get('/hari/edit/:idh', getUpdatePageHari);
router.post('/hari/delete/:idh', getDeleteHari);
router.post('/hari/update/:idh', getUpdateHari);

//siswa
router.get('/siswa', getPageSiswa);
router.get('/data_siswa', getSiswaData)
router.post('/insert_siswa', getInsertSiswa);
router.get('/siswa/edit/:id_siswa', getUpdatePageSiswa)
router.post('/siswa/update/:id_siswa', updateSiswa);
router.post('/siswa/delete/:id_siswa', getDeleteSiswa);
//sekolah
router.get('/sekolah', getDataSekolah)
router.get('/sekolah/edit/:id_sekolah', getUpdatePageSekolah);
router.post('/sekolah/update/:id_sekolah', updateSekolahData);
//jadwal
router.get('/jadwal', jadwal.getPageInsert);
router.post('/insert_jadwal', jadwal.getInsertJadwal)
router.get('/jadwal/senin', jadwal.senin)
router.get('/jadwal/selasa', jadwal.selasa)
router.get('/jadwal/rabu', jadwal.rabu)
router.get('/jadwal/kamis', jadwal.kamis)
router.get('/jadwal/jumat', jadwal.jumat)
router.get('/jadwal/edit/:idj', jadwal.getUpdatePage);
router.post('/jadwal/update/:idj', jadwal.getUpdateInsert);
router.post('/jadwal/delete/:idj', jadwal.getDelete)


module.exports = router;