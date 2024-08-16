const { InsertKelas, getKelas } = require('../models/models_kelas');
const getDataKelas = async (req, res) => {
    try {
        const row = await getKelas();
        res.render("admin/kelas", { row, index: 1 });  // Removed the leading slash
    } catch (error) {
        res.status(420).json(error);
    }
}


const getPageKelas = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/crud_kelas", { messages });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(500).send("Server Error");
    }
}

const getInsertKelas = async (req, res) => {
    const { nama_kelas } = req.body;

    try {
        // Attempt to insert the new class
        await InsertKelas(nama_kelas);
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/kelas');
    } catch (error) {
        // If an error occurs, set an error message
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/kelas');
    }
};

module.exports = { getPageKelas, getInsertKelas, getDataKelas };
