const jadwal_siswa = require("../../models/siswa/models_jadwal");
const siswamodel = require('../../models/siswa/models_siswa');
const rekapModel = require('../../models/siswa/models_rekap');
const { getSekolah } = require('../../models/models_sekolah');
const { getMapelById } = require("../../models/models_mapel");
const tahunAjar = require("../../models/models_tahunajar");
const models_tugas = require("../../models/guru/models_tugas");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {getRiwayatBySiswa} = require('../../models/models_riwayat')

const storagePath = path.join(__dirname, '..', '..', 'public', 'file_jawaban');
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

// Setup multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storagePath); // Tentukan folder penyimpanan
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
    }
});

const fileFilter = (req, file, cb) => {
    // Daftar tipe file yang diizinkan
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // File diizinkan
    } else {
        cb(new Error('Tipe file tidak diizinkan'), false); // Tipe file tidak diizinkan
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Batas ukuran file 5MB
}).single('file_jawaban');

module.exports = {
    dataJadwal: async (req, res) => {
        const id_kelas = req.session.id_kelas;
        const hari = req.query.hari || 'senin';
        try {
            const { data, count } = await jadwal_siswa.jadwal(id_kelas, hari);
            res.status(202).json({ data, count, hari });
        } catch (error) {
            console.log(error);
            return res.status(404);
        }
    },
    renderJadwal: async (req, res) => {
        try {
            const rows = await siswamodel.getsiswa(req, res);
            res.render("siswa/jadwal/jadwal", { rows });
        } catch (error) {
            console.log(error);
            return res.status(404);
        }
    },
    menuJadwal: async (req, res) => {
        const id_kelas = req.session.id_kelas;
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const rows = await siswamodel.getsiswa(req, res);
            const menudata = await rekapModel.rekapMenu(id_kelas);
            res.render('siswa/absen/menu_rekap', { rows, menudata, messages });
        } catch (error) {
            console.log(error);
            return res.status(404);
        }
    },
    Absen: async (req, res) => {
        const nis = req.session.username;
        const { idm, bulan, tahun, idth, id_kelas, semester } = req.query;
        try {
            const dataSekolah = await getSekolah();
            const rows = await siswamodel.getsiswa(req, res);
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const tahun_ajaran = await tahunAjar.TahunById(idth);
            const mp = await getMapelById(idm);
            const dataRekap = await rekapModel.rekapBulanan(
                idm,
                bulan || null,
                tahun || null,
                nis,
                idth,
                id_kelas,
                semester || null
            );

            const formattedData = {};
            const uniqueDates = new Set();

            dataRekap.forEach((record) => {
                const { nis, nama_siswa, nama_kelas, nama_ajaran, tanggal, status } = record;
                uniqueDates.add(tanggal);
                if (!formattedData[nis]) {
                    formattedData[nis] = {
                        nis,
                        nama_siswa,
                        nama_kelas,
                        nama_ajaran,
                        rekap: {},
                    };
                }
                formattedData[nis].rekap[tanggal] = status;
            });

            const dateArray = Array.from(uniqueDates).sort();
            res.render('siswa/absen/rekap', {
                formattedData,
                messages,
                dataSekolah,
                dateArray,
                kelas: id_kelas,
                mp,
                rows,
                tahun_ajaran,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Terjadi kesalahan pada server" });
        }
    },
    tugasPage: async (req, res) => {
        try {
            const rows = await siswamodel.getsiswa(req, res);
            res.render('siswa/tugas/index', { rows });
        } catch (error) {
            console.log(error);
            return res.status(404);
        }
    },
    uploadTugas: async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file', error: err.message });
            } 
    
            const { id_tugas, id_siswa, nilai, tanggal_pengumpulan, text_jawaban } = req.body;
            const file_jawaban = req.file ? req.file.filename : null;       
    
            try {
                
                const status = "menunggu";
    
                await models_tugas.insertPengumpulan(id_tugas, id_siswa, tanggal_pengumpulan, file_jawaban, text_jawaban, status, nilai);
                
                res.status(200).json({ message: 'Tugas berhasil dikirim', tanggal_pengumpulan : new Date().toLocaleDateString('id-ID'), status });
            } catch (error) {
                res.status(500).json({ message: 'Gagal menyimpan tugas', error: error.message });
            }
        });
    },
    
    tugasData: async (req, res) => {
        const { id_kelas } = req.params;
        try {
            const data = await models_tugas.dataTugasBysiswa(id_kelas);
            res.status(200).json({ data, count: data.length });
        } catch (error) {
            console.log(error);
            return res.status(404);
        }
    },
    tugasByid: async (req, res) => {
        const { id_tugas } = req.params;
        try {
            const rows = await siswamodel.getsiswa(req, res);
            const data = await models_tugas.dataTugasByid(id_tugas);
            if (!data) {
                req.flash("error", "Data Tugas tidak ditemukan!");
            }
            res.render('siswa/tugas/detail_tugas', { data, rows });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: 'Gagal mengambil data tugas' });
        }
    },

    // Tambahkan fungsi updateTugas
    updateTugas: async (req, res) => {
        const { id_tugas } = req.params;
        const { nama_tugas, deskripsi, deadline } = req.body;

        try {
            // Cek apakah tugas dengan ID yang diberikan ada
            const existingTugas = await models_tugas.dataTugasByid(id_tugas);
            if (!existingTugas) {
                req.flash("error", "Data Tugas tidak ditemukan!");
                return res.redirect('/siswa/tugas');
            }

            // Update data tugas
            await models_tugas.updateTugas(id_tugas, {
                nama_tugas,
                deskripsi,
                deadline,
            });

            req.flash("success", "Data tugas berhasil diperbarui!");
            res.redirect('/siswa/tugas');
        } catch (error) {
            console.log(error);
            req.flash("error", "Gagal memperbarui data tugas.");
            return res.status(500).json({ message: 'Gagal memperbarui data tugas' });
        }
    },
    detailJawaban : async (req, res) => {
        const {id_tugas, id_siswa} = req.params
        try {
            const data = await models_tugas.detailJawabanSiswa(id_tugas, id_siswa);
            res.status(200).json({data})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    jawaban_Siswa : async(req, res) => {
        const {id_tugas, id_siswa} = req.params
        try {
            
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const data = await models_tugas.detailJawabanSiswa(id_tugas, id_siswa)
            const rows = await siswamodel.getsiswa(req, res);
            res.render("siswa/tugas/detail_jawaban", ({data, rows, messages}))
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "ada kesalahan", err : error})
        }
    },
    nilaiSiswa : async(req, res) => {
        const nis = req.session.username
        try {
            const data = await models_tugas.dataNilaiBySiswa(nis)
            res.status(200).json({data})
        } catch (error) {
            console.log(error)
            res.status(404).json({message : "gagal mendapatkan data"})
        }
    },
    editJawabanSiswa : async(req, res) => {
        upload(req, res, async (err) => { 
            if (err) {
                return res.status(400).json({ message: 'Error uploading file', error: err.message });
            }

        const {id_pengumpulan} = req.params
        const {text_jawaban} = req.body
        let file_jawaban = req.file ? req.file.filename : null
        try {
            if(id_pengumpulan){
                const existingTugas = await models_tugas.detailPengumpulan(id_pengumpulan);
                    
                    // Jika file baru tidak diupload, gunakan file yang sudah ada
                    if (!file_jawaban && existingTugas && existingTugas.file_jawaban) {
                        file_jawaban = existingTugas.file_jawaban;
                    } else if (file_jawaban && existingTugas && existingTugas.file_jawaban) {
                        // Jika ada file baru dan file lama, hapus file lama
                        fs.unlink(path.join(storagePath, existingTugas.file_jawaban), (unlinkErr) => {
                            if (unlinkErr) console.log('Error deleting old file:', unlinkErr);
                        });
                    }
            }
            await models_tugas.editJawaban(file_jawaban, text_jawaban, id_pengumpulan)
            res.status(200).json({message : "Berhasil mengupdate jawaban"})
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    })
    },
    riwayat : async (req, res) =>{
        try {
            const rows = await siswamodel.getsiswa(req, res);
            res.render('siswa/riwayat/index', {rows})
        } catch (error) {
            
        }
    },
    riwayatSiswa : async (req, res) => {
        const nis = req.session.username
        try {
            const data = await getRiwayatBySiswa(nis)
            res.status(200).json({data})
        } catch (error) {
            console.log(error);
            return res.status(404).json({error});
        }
    }
};
