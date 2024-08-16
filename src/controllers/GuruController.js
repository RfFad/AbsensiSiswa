const { InsertGuru, getGuru } = require('../models/models_guru')
const getGuruData = async (req, res) => {
    try {
        const row = await getGuru();
        res.render("admin/guru", { row, index: 1 });
    } catch (error) {
        res.status(500).json(error);
    }
}
const getPageGuru = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error : req.flash('error')
        };
        res.render("admin/crud_guru", { messages });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(400).send("Server Error");
    }
}
const getInsertGuru = async (req, res) => {
    const {nip, nama_guru, jk, jabatan, alamat, password} = req.body;
    try {
        await InsertGuru(nip, nama_guru, jk, jabatan, alamat, password);
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/guru');
    } catch (error) {
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/guru');
    }
}
module.exports = {getInsertGuru, getPageGuru, getGuruData};