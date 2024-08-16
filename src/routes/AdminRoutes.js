const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware')  // assuming authHeader is another middleware
const {getInsertSiswa, pageInsert} = require('../controllers/AdminCrudController')
const {getPageKelas, getInsertKelas, getDataKelas} = require('../controllers/KelasController')
const {getInsertGuru, getPageGuru, getGuruData} = require ('../controllers/GuruController')
const{getCountData} = require ('../controllers/CountAdminController');

//router
router.get('/', checkRole('admin'), authHeader, getCountData)

//
router.get('/insert_siswa', pageInsert)
router.post('/create_siswa', getInsertSiswa)
//kelas
router.get('/kelas', getPageKelas);
router.post('/insert_kelas', getInsertKelas);
router.get('/data_kelas', getDataKelas);
//guru
router.get('/guru', getPageGuru);
router.get('/data_guru', getGuruData)
router.post('/insert_guru', getInsertGuru);

module.exports = router;