const { InsertSiswa, getSiswa, getSiswaById, UpdateSiswa, DeleteSiswa } = require('../models/models_siswa');
const {getKelas} = require('../models/models_kelas')
const md5 = require('md5'); // Import the MD5 module

const getSiswaData = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        const row = await getSiswa();
        res.render("admin/siswa", { row, index: 1, messages });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getPageSiswa = async (req, res) => {
    try {
        const row = await getKelas();
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/crud_siswa", { messages, row });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(400).send("Server Error");
    }
}

const getInsertSiswa = async (req, res) => {
    const { nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password } = req.body;
    try {
        const hashedPassword = md5(password); // Hash the password using MD5
        await InsertSiswa(nis, nama_siswa, id_kelas, jk, nama_wali, alamat,hashedPassword); // Use the hashed password
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/data_siswa');
    } catch (error) {
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/siswa');
    }
}

const getUpdatePageSiswa = async (req, res) => {
    const { id_siswa } = req.params;
    try {
        const row =  await getKelas()
        const siswa = await getSiswaById(id_siswa);
        if (!siswa) {
            req.flash('error', 'Data siswa tidak ditemukan!');
            return res.redirect('/admin/data_siswa');
        }
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/edit_siswa", { siswa, messages, row });
    } catch (error) {
        console.error("Error rendering the update page:", error);
        res.status(400).send("Server Error");
    }
}

const updateSiswa = async (req, res) => {
    const { id_siswa } = req.params;
    const { nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password } = req.body;
    try {
        const hashedPassword = md5(password); // Hash the password using MD5
        await UpdateSiswa(id_siswa ,nis, nama_siswa, id_kelas, jk, nama_wali, alamat,hashedPassword); // Use the hashed password
        req.flash('success', 'Berhasil memperbarui data!');
        return res.redirect('/admin/data_siswa');
    } catch (error) {
        req.flash('error', `Gagal memperbarui data! ${error.message}`);
        return res.redirect(`/admin/siswa/edit/${id_siswa}`);
    }
}

const getDeleteSiswa = async (req, res) => {
    const { id_siswa } = req.params;
    try {
        await DeleteSiswa(id_siswa);
        req.flash('success', 'Berhasil Menghapus data!');
        return res.redirect('/admin/data_siswa');
    } catch (error) {
        req.flash('error', `Gagal Menghapus data! ${error.message}`);
        return res.redirect('/admin/data_siswa');
    }
}

module.exports = { getInsertSiswa, getPageSiswa, getSiswaData, getUpdatePageSiswa, updateSiswa, getDeleteSiswa };
