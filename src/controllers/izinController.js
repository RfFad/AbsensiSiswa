const izinModel = require('../models/models_izin')
const guru = require('../models/guru/models_guru');
const siswa  = require('../models/siswa/models_siswa');
const { message } = require('./siswa/SiswaController');

module.exports = {
    insertIzin  : async(req, res) => {
        const {id_siswa, id_guru, jenis, keterangan, tanggal} = req.body
        try {
           
            const status = "pending"
            await izinModel.createIzin( id_siswa, id_guru, jenis, keterangan, tanggal, status)
            res.io.to(`guru_${id_guru}`).emit("update-izin", {id_siswa,
                tanggal,
                jenis,
                status:"pending",
            }) 
                
            req.flash("success", "Berhasil mengajukan izin.");
            res.redirect("/siswa/jadwal")
        } catch (error) {
            console.error("Error saat mengajukan izin:", error);
    req.flash("error", "Terjadi kesalahan saat mengajukan izin.");
    res.redirect("/izin");
        }
    },
    notif_izin : async(req, res) => {
        const nip = req.session.username
        try {
            data = await izinModel.notif(nip)
            res.status(202).json({data})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    data_izin : async(req, res) =>{
        const nip = req.session.username
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
            const rows = await guru.getguru(req, res)
            const data = await izinModel.izin(nip)
            
            res.render('guru/izin/index', {data, rows, messages})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    pesanCount : async (req, res) => {
        const nip = req.session.username
        try {
            const data = await izinModel.izin(nip)
            const jumlah = data.length
            res.status(200).json({jumlah})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    izin_detail : async(req, res) =>{
        const {id_izin} = req.params
        try {
            const rows = await guru.getguru(req, res)
            const data = await izinModel.izinDetail(id_izin)
            res.render('guru/izin/detail_izin', {data, rows})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    izin_detailSiswa : async(req, res) =>{
        const {id_izin} = req.params
        try {
            const rows = await siswa.getsiswa(req, res)
            const data = await izinModel.izinDetail(id_izin)
            res.render('siswa/message/detail_izin', {data, rows})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    read : async(req, res) => {
        const {id_guru} = req.params
        try {
            await izinModel.read(id_guru)
            res.status(202)
        } catch (error) {
            console.log(error)
            res.status(404).json(error)
        }
    },
    setujuiIzin : async (req, res) =>{
        const {id_izin} = req.params
        try {
            await izinModel.setujui(id_izin)
            req.flash('success', 'anda telah mennyetujui permintaan izin')
            res.redirect("/guru/permintaan_izin")
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    tolakIzin : async (req, res) =>{
        const {id_izin} = req.params
        try {
            await izinModel.tolak(id_izin)
            req.flash('success', 'anda telah menolak permintaan izin')
            res.redirect("/guru/permintaan_izin")
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    //siswa
    dataIzin : async(req, res) => {
        const nis = req.session.username
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
            const dataInbox = await siswa.inbox(nis)
            const rows = await siswa.getsiswa (req, res)
            const data = await izinModel.izinSiswa(nis)
            res.render('siswa/message/izin', {data, rows, messages, countInbox : dataInbox.length})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    Izinhapus : async (req, res) => {
        const {id_izin} = req.params
        try {
            await izinModel.hapusIzin(id_izin)
            req.flash('success', 'Berhasil menghapus izin')
            res.status(202).json({msg : 'berhasil menghapus'})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    }
}
