const tahunAjar = require ("../../models/models_tahunajar")
const {UpdateSiswa} = require("../../models/models_siswa");
const { updateSiswa } = require("./SiswaController");
const TahunAjarCont = {
TahunAjar : async(req, res) => {
    try {
        const messages = {
            success: req.flash("success"),
            error: req.flash("error"),
          };
        const row = await tahunAjar.getTahunAjar();
        res.render("Admin/tahun_ajar/tahun_ajar", {row, messages, currentPath : "/admin/tahun_ajaran"});
    } catch (error) {
        res.status(404).json({msg : error});
        console.log(error)
    }
},
PageInsert : async(req, res) => {
    try {
        const messages = {
            success: req.flash("success"),
            error: req.flash("error"),
          };
        res.render("Admin/tahun_ajar/crud_tahun", {messages, currentPath:"/admin/tambah_tahun"});
    } catch (error) {
        req.res(404).send("tidak bisa membaca page ini")
    }
},
InsertTahun : async (req, res) => {
    const {nama_ajaran} = req.body
    try {
        await tahunAjar.InsertTahunAjar(nama_ajaran)
        req.flash("success", "berhasil menambahkan data")
        console.log("berhasil")
        return res.redirect("/admin/tahun_ajaran")
    } catch (error) {
        req.flash("error", `Gagal menambahkan data! ${error.message}`);
        console.log({message : error})
        return res.redirect("/admin/tambah_tahun")
    }
},
DeleteTahun : async(req, res) => {
    const {idth} = req.params
    try {
        await tahunAjar.DeleteAjaran(idth)
        console.log("berhasil menghapus data")
        req.flash("success", "berhasil menghapus data")
        return res.redirect("/admin/tahun_ajaran");
    } catch (error) {
        res.status(404).send(error)
        console.log({msg : "terjadi kesalahan", Error : error})
    }
},
GetAjaranId : async (req, res) => {
    const {idth} = req.params
    try {
        const tahun = await tahunAjar.TahunById(idth)
        if(!tahun){
            req.flash("error", "Data Tahun tidak ditemukan!");
            return res.redirect("/admin/tahun_ajaran");
        }
        const messages = {
            error: req.flash("error")  
        };
        res.render("Admin/tahun_ajar/edit_ajaran", {tahun, messages, currentPath : "/admin/tahun_ajaranId/:idth"})
    } catch (error) {
        console.log(error)
        res.status(400).send("internal serve error");
    }
},
UpdateTahunAjar : async (req, res) => {
    const {idth} = req.params
    const {nama_ajaran} = req.body
    try {
        
        await tahunAjar.UpdateTahun(idth, nama_ajaran)
        req.flash("success", "berhasil memperbarui data")
        console.log("berhasil")
        return res.redirect("/Admin/tahun_ajaran");
    } catch (error) {
        req.flash("error", "Gagal Mengupdate")
        console.log(error)
        return  res.redirect(`/Admin/tahun_ajaranId/${idth}`)
    }
}
}
module.exports = TahunAjarCont;