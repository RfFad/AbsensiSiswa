const rekapModel = require("../../models/guru/models_rekap");
const guru = require('../../models/guru/models_guru');
const {getSekolah} = require('../../models/models_sekolah')

module.exports = {
    rekapAbsensiKelas: async(req, res) => {
        const { id_kelas } = req.params;
        const 
        nip = req.session.username;
        const { tanggal, mode } = req.query;

        try {
            const dataSekolah = await getSekolah()
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const rows = await guru.getguru(req, res);
            let dataRekap;

            if (mode === "harian") {
                dataRekap = await rekapModel.rekapHarian(id_kelas, tanggal, nip);
            } else if (mode === "bulanan") {
                dataRekap = await rekapModel.rekapBulanan(id_kelas);
            } else {
                throw new Error('Mode tidak valid');
            }

            // Format data agar `nama_siswa` dan `tanggal` atau `bulan` hanya muncul sekali
            const formattedData = {};

            dataRekap.forEach((record) => {
                const { id_siswa, nis, nama_siswa, tanggal, bulan, tahun, status, jumlah } = record;
                if (!formattedData[id_siswa]) {
                    formattedData[id_siswa] = {
                        nis,
                        nama_siswa,
                        tanggal,
                        rekap: {}
                    };
                }

                const key = mode === "harian" ? tanggal : `${tahun}-${bulan}`;
                if (!formattedData[id_siswa].rekap[key]) {
                    formattedData[id_siswa].rekap[key] = {};
                }

                formattedData[id_siswa].rekap[key][status] = jumlah;
            });

            res.render('guru/absen/rekap', { formattedData, mode, rows, messages, dataSekolah});

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
    }
};
