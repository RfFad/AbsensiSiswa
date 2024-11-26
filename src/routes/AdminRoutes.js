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
router.get('/', verifyUser.isLogin, getCountData)

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
router.get('/info_guru/:nip', getInfoGuruNip);
router.get('/export/guru', ExportDataGuru)
//hari
router.get('/hari', getPageHari);
router.post('/hari/create', getInsertHari);

router.get('/data_hari', getDataHari);
router.get('/hari/edit/:idh', getUpdatePageHari);
router.post('/hari/delete/:idh', getDeleteHari);
router.post('/hari/update/:idh', getUpdateHari);

//siswa
router.get('/grafik', getGrafik)
router.get('/siswa', getPageSiswa);
router.get('/data_siswa', getSiswaData)
router.post('/insert_siswa', getInsertSiswa);
router.get('/siswa/edit/:id_siswa', getUpdatePageSiswa)
router.get('/info_siswa/:nis', getInfoSiswaNis)
router.post('/siswa/update/:id_siswa', updateSiswa);
router.post('/siswa/delete/:id_siswa', getDeleteSiswa);
router.get('/export/siswa', ExportDataSiswa)
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
//riwayat
router.get('/riwayat', riwayat.getPageRiwayat);
router.get('/data_riwayat', riwayat.getRiwayatData)
router.post('/insert_riwayat',riwayat.getInsertRiwayat );
router.get('/riwayat/edit/:id_riwayat', riwayat.getUpdatePageRiwayat)
router.post('/riwayat/update/:id_riwayat', riwayat.UpdateRiwayat);
router.post('/riwayat/delete/:id_riwayat', riwayat.getDeleteRiwayat);
router.get('/prestasi', riwayat.getPrestasi)
router.get('/pelanggaran', riwayat.getPelanggaran)
router.get('/getSiswaByKelas/:id_kelas', (req, res) => {
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
router.get("/tahun_ajaran", TahunAjaranCont.TahunAjar)
router.get("/tambah_tahun", TahunAjaranCont.PageInsert)
router.post("/simpan_tahun", TahunAjaranCont.InsertTahun)
router.post("/delete_ajaran/:idth", TahunAjarCont.DeleteTahun)
router.get("/tahun_ajaranId/:idth", TahunAjarCont.GetAjaranId)
router.post("/update_ajaran/:idth", TahunAjarCont.UpdateTahunAjar)
router.get("/kenaikankelas", naikKelas);
router.post("/import_siswa", importDataSiswa);
router.post("/import_guru", importGuru);
//user
router.get('/data_user', user.getUser)
router.post('/insert_user', user.getinsert)
router.get('/user', user.getInsertPage)
router.get('/edit_user/:id_user', user.detailUser)
router.post('/update_user/:id_user', user.getUpdateUser)
router.post('/delete_user/:id_user', user.getDelete)
router.get('/admin_user', user.getUserFp)
module.exports = router;