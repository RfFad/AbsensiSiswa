const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware')  // assuming authHeader is another middleware
const {getInsertSiswa, pageInsert} = require('../controllers/AdminCrudController')
const {getPageKelas, getInsertKelas, getDataKelas, getUpdateKelas, getUpdatePageKelas, getDeleteKelas} = require('../controllers/KelasController')
const {getInsertGuru, getPageGuru, getGuruData, getUpdatePage, updateGuru, getDeleteGuru} = require ('../controllers/GuruController')
const{getCountData} = require ('../controllers/CountAdminController');
const {getInsertMapel, getDataMapel, getPageMapel, getUpdateMapel, getUpdatePageMapel, getDeleteMapel} = require('../controllers/MapelController')
const {getInsertHari, getPageHari} = require ('../controllers/HariController');

//router
router.get('/', checkRole('admin'), authHeader, getCountData)

//
router.get('/insert_siswa', pageInsert)
router.post('/create_siswa', getInsertSiswa)
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

module.exports = router;