const { InsertRiwayat, getRiwayat, getRiwayatById, UpdateRiwayat, DeleteRiwayat } = require('../../models/models_riwayat');
const {getSiswa} = require('../../models/models_siswa')
const {getKelas} = require ('../../models/models_kelas');
const { getDataKelas } = require('./KelasController');
 // Import the MD5 module
 const riwayat = {



 getRiwayatData : async (req, res) => {
    try {
        const messages = {
            
            success: req.flash('success'),
            error: req.flash('error')
        };
        const row = await getRiwayat();
        res.render("admin/riwayat/riwayat", { row, index: 1, messages, currentPath : '/admin/data_riwayat' });
    } catch (error) {
        res.status(500).json(error);
    }
},

getPageRiwayat : async (req, res) => {
    try {
        const kelas = await getKelas();
        const row = await getSiswa();
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/riwayat/crud_riwayat", { messages, row, kelas, currentPath : '/admin/riwayat' });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(400).send("Server Error");
    }
},
 getInsertRiwayat : async (req, res) => {
    const {   id_siswa, id_kelas,  prestasi, pelanggaran, tanggal } = req.body;
    try { 
        await InsertRiwayat(  id_siswa, id_kelas, prestasi, pelanggaran, tanggal); // Use the hashed password
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/data_riwayat');
    } catch (error) {
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/riwayat');
    }
},

 getUpdatePageRiwayat : async (req, res) => {
    const { id_riwayat } = req.params;
    try {
        const row =  await getRiwayat()
        const kelas = await getKelas();
        const siswa = await getSiswa();
        const riwayat = await getRiwayatById(id_riwayat);
        if (!riwayat) {
            req.flash('error', 'Data riwayat tidak ditemukan!');
            return res.redirect('/admin/data_riwayat');
        }
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/riwayat/edit_riwayat", { riwayat, messages, row, kelas, siswa, currentPath : '/admin/riwayat/edit/:id_riwayat' });
    } catch (error) {
        console.error("Error rendering the update page:", error);
        res.status(400).send("Server Error");
    }
},
 UpdateRiwayat : async (req, res) => {
    const { id_riwayat } = req.params;
    const { id_siswa, id_kelas, prestasi, pelanggaran, tanggal } = req.body;
    try { 
        await UpdateRiwayat(id_riwayat, id_siswa, id_kelas, prestasi, pelanggaran, tanggal); // Use the hashed password
        req.flash('success', 'Berhasil memperbarui data!');
        return res.redirect('/admin/data_riwayat');
    } catch (error) {
        req.flash('error', `Gagal memperbarui data! ${error.message}`);
        return res.redirect(`/admin/riwayat/edit/${id_riwayat}`);
    }
},
 getDeleteRiwayat : async (req, res) => {
    const { id_riwayat } = req.params;
    try {
        await DeleteRiwayat(id_riwayat);
        req.flash('success', 'Berhasil Menghapus data!');
        return res.redirect('/admin/data_riwayat');
    } catch (error) {
        req.flash('error', `Gagal Menghapus data! ${error.message}`);
        return res.redirect('/admin/data_riwayat');
    }
}
}
module.exports = riwayat;
