const rekapModel = require("../../models/guru/models_rekap");
const guru = require('../../models/guru/models_guru');
const {getSekolah} = require('../../models/models_sekolah')
const {getKelasById} = require("../../models/models_kelas");
const {getMapelById} = require("../../models/models_mapel");
const tahunAjar = require("../../models/models_tahunajar")
module.exports = {
    rekapAbsensiKelas: async (req, res) => {
        const { id_kelas } = req.params;
        const nip = req.session.username;
        const { bulan, tahun, idm, idth, semester } = req.query;

    
        try {
            const dataSekolah = await getSekolah();
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const tahun_ajaran = await tahunAjar.TahunById(idth)
            const kelas = await getKelasById(id_kelas);
            const rows = await guru.getguru(req, res);
            const mp = await getMapelById(idm); 

            const dataRekap = await rekapModel.rekapBulanan(
                id_kelas,
                bulan || null,
                tahun || null,
                nip, 
                idth,
                semester || null
            );
    
            const formattedData = {};
            const uniqueDates = new Set();
    
            dataRekap.forEach((record) => {
                const { id_siswa, nis, nama_siswa, nama_kelas, nama_ajaran, tanggal, status } = record;
                uniqueDates.add(tanggal);
    
                if (!formattedData[id_siswa]) {
                    formattedData[id_siswa] = {
                        nis,
                        nama_siswa,
                        nama_kelas,
                        nama_ajaran,
                        rekap: {}
                    };
                }
    
                formattedData[id_siswa].rekap[tanggal] = status;
            });
    
            const dateArray = Array.from(uniqueDates).sort();
    
            res.render('guru/absen/rekap', { formattedData, rows, messages, dataSekolah, dateArray, kelas, mp, tahun_ajaran });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },
    
    menuRekap : async(req, res) => {
        const nip = req.session.username
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const menudata = await rekapModel.menu(nip)
            const rows = await guru.getguru(req, res);
            res.render("guru/absen/menu_rekap", {rows, messages, menudata})
        } catch (error) {
            console.log(`Terjadi Error : ${error}`)
            res.status(404)
        }
    },
    
};
