const { InsertRiwayat, getRiwayat, getRiwayatById, UpdateRiwayat, DeleteRiwayat } = require('../models/models_riwayat');
const {getSiswa} = require('../models/models_siswa')
const md5 = require('md5'); // Import the MD5 module

const getRiwayatData = async (req, res) => {
    try {
        const messages = {
            
            success: req.flash('success'),
            error: req.flash('error')
        };
        const row = await getRiwayat();
        res.render("admin/riwayat/riwayat", { row, index: 1, messages });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getPageRiwayat = async (req, res) => {
    try {
        const row = await getSiswa();
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/riwayat/crud_riwayat", { messages, row });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(400).send("Server Error");
    }
}

const getInsertRiwayat = async (req, res) => {
    const { id_riwayat,  id_siswa, prestasi, pelanggaran } = req.body;
    try {
        const hashedPassword = md5(password); // Hash the password using MD5
        await InsertRiwayat(id_riwayat,  id_siswa, prestasi, pelanggaran); // Use the hashed password
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/data_riwayat');
    } catch (error) {
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/riwayat');
    }
}

const getUpdatePageRiwayat = async (req, res) => {
    const { id_riwayat } = req.params;
    try {
        const row =  await getRiwayat()
        const riwayat = await getRiwayatById(id_riwayat);
        if (!riwayat) {
            req.flash('error', 'Data riwayat tidak ditemukan!');
            return res.redirect('/admin/data_riwayat');
        }
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/riwayat/edit_riwayat", { riwayat, messages, row });
    } catch (error) {
        console.error("Error rendering the update page:", error);
        res.status(400).send("Server Error");
    }
}
const UpdateRiwayat = async (req, res) => {
    const { id_riwayat } = req.params;
    const { id_siswa, prestasi, pelanggaran } = req.body;
    try {
        const hashedPassword = md5(password); // Hash the password using MD5
        await UpdateRiwayat(id_riwayat,  id_siswa, prestasi, pelanggaran); // Use the hashed password
        req.flash('success', 'Berhasil memperbarui data!');
        return res.redirect('/admin/data_riwayat');
    } catch (error) {
        req.flash('error', `Gagal memperbarui data! ${error.message}`);
        return res.redirect(`/admin/riwayat/edit/${id_riwayat}`);
    }
}

const getDeleteRiwayat = async (req, res) => {
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

module.exports = { getInsertRiwayat, getPageRiwayat, getRiwayatData, getUpdatePageRiwayat, UpdateRiwayat, getDeleteRiwayat };
