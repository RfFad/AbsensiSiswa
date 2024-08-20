const {InsertHari,UpdateHari, HariById } = require('../models/models_hari');

const getInsertHari = async (req, res) => {
    const {hari} = req.body ;
    try {
         await InsertHari(hari);
        req.flash('success', 'Berhasil menambahkan data!');
        return res.redirect('/admin/hari');
    } catch (error) {
        req.flash('error', `Gagal menambahkan data! ${error.message}`);
        return res.redirect('/admin/hari');
    }
}
const getPageHari = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/crud_hari", { messages });
    } catch (error) {
        console.error("Error rendering the page:", error);
        res.status(500).send("Server Error");
    }
}

module.exports = {getInsertHari, getPageHari}
