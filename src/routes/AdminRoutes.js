const express = require('express');
const router = express.Router();
const db = require('../configs/Databases')
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware')  // assuming authHeader is another middleware
// const {getInsertSiswa, pageInsert} = require('../controllers/AdminCrudController')
const {getPageKelas, getInsertKelas, getDataKelas, getUpdateKelas, getUpdatePageKelas, getDeleteKelas} = require('../controllers/admin/KelasController')
const {getInsertGuru, importGuru, ExportDataGuru, getPageGuru, getGuruData, getUpdatePage, updateGuru, getDeleteGuru, getInfoGuruNip} = require ('../controllers/admin/GuruController')
const{getCountData} = require ('../controllers/admin/CountAdminController');
const {getInsertMapel, getDataMapel, getPageMapel, getUpdateMapel, getUpdatePageMapel, getDeleteMapel} = require('../controllers/admin/MapelController')
const {getInsertHari, getPageHari, getDataHari, getDeleteHari, getUpdateHari, getUpdatePageHari} = require ('../controllers/admin/HariController');
// const {getInsertHari, getPageHari} = require ('../controllers/admin/HariController');
const { getInsertSiswa, importDataSiswa,naikKelas, getPageSiswa, getSiswaData, getUpdatePageSiswa, updateSiswa, getDeleteSiswa, getInfoSiswaNis, getGrafik, ExportDataSiswa } = require('../controllers/admin/SiswaController') 
const {getUpdatePageSekolah, updateSekolahData, getDataSekolah} = require('../controllers/admin/SekolahController')
const TahunAjaranCont= require("../controllers/admin/TahunAjarController");
const jadwal = require ('../controllers/admin/JadwalController');
const riwayat = require ('../controllers/admin/RiwayatController');
const TahunAjarCont = require('../controllers/admin/TahunAjarController');
const user = require('../controllers/admin/UserController')

//router
router.get('/', verifyUser.isLogin, checkRole('admin'), getCountData)

// //
// router.get('/insert_siswa', pageInsert)
// router.post('/create_siswa', getInsertSiswa)
//kelas

router.get('/kelas', verifyUser.isLogin, checkRole('admin'), authHeader, getPageKelas);
router.post('/insert_kelas', verifyUser.isLogin, checkRole('admin'), authHeader, getInsertKelas);
router.get('/data_kelas', verifyUser.isLogin, checkRole('admin'), authHeader, getDataKelas);
router.get('/kelas/edit/:id_kelas', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdatePageKelas);
router.post('/kelas/delete/:id_kelas', verifyUser.isLogin, checkRole('admin'), authHeader, getDeleteKelas);
router.post('/kelas/update/:id_kelas', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdateKelas);
//Mapel
router.get('/data_mapel', verifyUser.isLogin, checkRole('admin'), authHeader, getDataMapel);
router.get('/mapel/create', verifyUser.isLogin, checkRole('admin'), authHeader, getPageMapel);
router.post('/mapel/create', verifyUser.isLogin, checkRole('admin'), authHeader, getInsertMapel);
router.get('/mapel/edit/:idm', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdatePageMapel);
router.post('/mapel/update/:idm', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdateMapel);
router.post('/mapel/delete/:idm', verifyUser.isLogin, checkRole('admin'), authHeader, getDeleteMapel);
//guru
router.get('/guru/', verifyUser.isLogin, checkRole('admin'), authHeader, getPageGuru);
router.get('/data_guru', verifyUser.isLogin, checkRole('admin'), authHeader, getGuruData)
router.post('/insert_guru', verifyUser.isLogin, checkRole('admin'), authHeader, getInsertGuru);
router.get('/guru/edit/:id_guru', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdatePage)
router.post('/guru/update/:id_guru', verifyUser.isLogin, checkRole('admin'), authHeader, updateGuru);
router.post('/guru/delete/:id_guru', verifyUser.isLogin, checkRole('admin'), authHeader, getDeleteGuru);
router.get('/info_guru/:nip', verifyUser.isLogin, checkRole('admin'), authHeader, getInfoGuruNip);
router.get('/export/guru', verifyUser.isLogin, checkRole('admin'), authHeader, ExportDataGuru)
//hari
router.get('/hari', verifyUser.isLogin, checkRole('admin'), authHeader, getPageHari);
router.post('/hari/create', verifyUser.isLogin, checkRole('admin'), authHeader, getInsertHari);

router.get('/data_hari', verifyUser.isLogin, checkRole('admin'), authHeader, getDataHari);
router.get('/hari/edit/:idh', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdatePageHari);
router.post('/hari/delete/:idh', verifyUser.isLogin, checkRole('admin'), authHeader, getDeleteHari);
router.post('/hari/update/:idh', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdateHari);

//siswa
router.get('/grafik', verifyUser.isLogin, checkRole('admin'), authHeader, getGrafik)
router.get('/siswa', verifyUser.isLogin, checkRole('admin'), authHeader, getPageSiswa);
router.get('/data_siswa', verifyUser.isLogin, checkRole('admin'), authHeader, getSiswaData)
router.post('/insert_siswa', verifyUser.isLogin, checkRole('admin'), authHeader, getInsertSiswa);
router.get('/siswa/edit/:id_siswa', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdatePageSiswa)
//ini buat guru juga
router.get('/info_siswa/:nis', verifyUser.isLogin, getInfoSiswaNis)
//end
router.post('/siswa/update/:id_siswa', verifyUser.isLogin, checkRole('admin'), authHeader, updateSiswa);
router.post('/siswa/delete/:id_siswa', verifyUser.isLogin, checkRole('admin'), authHeader, getDeleteSiswa);
router.get('/export/siswa', verifyUser.isLogin, checkRole('admin'), authHeader, ExportDataSiswa)
//sekolah
router.get('/sekolah', verifyUser.isLogin, checkRole('admin'), authHeader, getDataSekolah)
router.get('/sekolah/edit/:id_sekolah', verifyUser.isLogin, checkRole('admin'), authHeader, getUpdatePageSekolah);
router.post('/sekolah/update/:id_sekolah', verifyUser.isLogin, checkRole('admin'), authHeader, updateSekolahData);
//jadwal
router.get('/jadwal', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.getPageInsert);
router.post('/insert_jadwal', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.getInsertJadwal)
router.get('/jadwal/senin', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.senin)
router.get('/jadwal/selasa', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.selasa)
router.get('/jadwal/rabu', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.rabu)
router.get('/jadwal/kamis', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.kamis)
router.get('/jadwal/jumat', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.jumat)
router.get('/jadwal/sabtu', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.sabtu)
router.get('/jadwal/edit/:idj', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.getUpdatePage);
router.post('/jadwal/update/:idj', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.getUpdateInsert);
router.post('/jadwal/delete/:idj', verifyUser.isLogin, checkRole('admin'), authHeader, jadwal.getDelete)
//riwayat
router.get('/riwayat', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.getPageRiwayat);
router.get('/data_riwayat', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.getRiwayatData)
router.post('/insert_riwayat', verifyUser.isLogin, checkRole('admin'), authHeader,riwayat.getInsertRiwayat );
router.get('/riwayat/edit/:id_riwayat', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.getUpdatePageRiwayat)
router.post('/riwayat/update/:id_riwayat', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.UpdateRiwayat);
router.post('/riwayat/delete/:id_riwayat', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.getDeleteRiwayat);
router.get('/prestasi', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.getPrestasi)
router.get('/pelanggaran', verifyUser.isLogin, checkRole('admin'), authHeader, riwayat.getPelanggaran)
router.get('/getSiswaByKelas/:id_kelas', verifyUser.isLogin, checkRole('admin'), authHeader, (req, res) => {
    const id_kelas = req.params.id_kelas;

    const query = 'SELECT id_siswa, nama_siswa FROM siswa WHERE id_kelas = ?';
    db.query(query, [id_kelas], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});
// Tahun Ajaran
router.get("/tahun_ajaran", verifyUser.isLogin, checkRole('admin'), authHeader, TahunAjaranCont.TahunAjar)
router.get("/tambah_tahun", verifyUser.isLogin, checkRole('admin'), authHeader, TahunAjaranCont.PageInsert)
router.post("/simpan_tahun", verifyUser.isLogin, checkRole('admin'), authHeader, TahunAjaranCont.InsertTahun)
router.post("/delete_ajaran/:idth", verifyUser.isLogin, checkRole('admin'), authHeader, TahunAjarCont.DeleteTahun)
router.get("/tahun_ajaranId/:idth", verifyUser.isLogin, checkRole('admin'), authHeader, TahunAjarCont.GetAjaranId)
router.post("/update_ajaran/:idth", verifyUser.isLogin, checkRole('admin'), authHeader, TahunAjarCont.UpdateTahunAjar)
router.get("/kenaikankelas", verifyUser.isLogin, checkRole('admin'), authHeader, naikKelas);
router.post("/import_siswa", verifyUser.isLogin, checkRole('admin'), authHeader, importDataSiswa);
router.post("/import_guru", verifyUser.isLogin, checkRole('admin'), authHeader, importGuru);
//user
router.get('/data_user', verifyUser.isLogin, checkRole('admin'), authHeader, user.getUser)
router.post('/insert_user', verifyUser.isLogin, checkRole('admin'), authHeader, user.getinsert)
router.get('/user', verifyUser.isLogin, checkRole('admin'), authHeader, user.getInsertPage)
router.get('/edit_user/:id_user', verifyUser.isLogin, checkRole('admin'), authHeader, user.detailUser)
router.post('/update_user/:id_user', verifyUser.isLogin, checkRole('admin'), authHeader, user.getUpdateUser)
router.post('/delete_user/:id_user', verifyUser.isLogin, checkRole('admin'), authHeader, user.getDelete)
router.get('/admin_user', verifyUser.isLogin, checkRole('admin'), authHeader, user.getUserFp)
module.exports = router;