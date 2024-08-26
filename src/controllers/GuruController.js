const { InsertGuru, getGuru, getGuruById, UpdateGuru, DeleteGuru } = require('../models/models_guru');
const md5 = require('md5'); // Import the MD5 module

const getGuruData = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        const row = await getGuru();
        res.render("admin/guru/guru", { row, index: 1, messages });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getPageGuru = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/guru/crud_guru", { messages });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(400).send("Server Error");
    }
}

const getInsertGuru = async (req, res) => {
    const { nip, nama_guru, jk, jabatan, alamat, password } = req.body;
    try {
        const hashedPassword = md5(password); // Hash the password using MD5
        await InsertGuru(nip, nama_guru, jk, jabatan, alamat, hashedPassword); // Use the hashed password
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/data_guru');
    } catch (error) {
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/guru');
    }
}

const getUpdatePage = async (req, res) => {
    const { id_guru } = req.params;
    try {
        const guru = await getGuruById(id_guru);
        if (!guru) {
            req.flash('error', 'Data guru tidak ditemukan!');
            return res.redirect('/admin/data_guru');
        }
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/guru/edit_guru", { guru, messages });
    } catch (error) {
        console.error("Error rendering the update page:", error);
        res.status(400).send("Server Error");
    }
}

const updateGuru = async (req, res) => {
    const { id_guru } = req.params;
    const { nip, nama_guru, jk, jabatan, alamat, password } = req.body;
    try {
        const hashedPassword = md5(password); // Hash the password using MD5
        await UpdateGuru(id_guru, nip, nama_guru, jk, jabatan, alamat, hashedPassword); // Use the hashed password
        req.flash('success', 'Berhasil memperbarui data!');
        return res.redirect('/admin/data_guru');
    } catch (error) {
        req.flash('error', `Gagal memperbarui data! ${error.message}`);
        return res.redirect(`/admin/guru/edit/${id_guru}`);
    }
}

const getDeleteGuru = async (req, res) => {
    const { id_guru } = req.params;
    try {
        await DeleteGuru(id_guru);
        req.flash('success', 'Berhasil Menghapus data!');
        return res.redirect('/admin/data_guru');
    } catch (error) {
        req.flash('error', `Gagal Menghapus data! ${error.message}`);
        return res.redirect('/admin/data_guru');
    }
}

module.exports = { getInsertGuru, getPageGuru, getGuruData, getUpdatePage, updateGuru, getDeleteGuru };
