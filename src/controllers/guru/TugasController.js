const modelTugas = require('../../models/guru/models_tugas');
const guru = require('../../models/guru/models_guru');
const path = require('path');
const { getKelas } = require('../../models/models_kelas');
const multer = require('multer');
const fs = require('fs');

const storagePath = path.join(__dirname, '..', '..', 'public', 'file_tugas');
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
}).single('file_tugas');

module.exports = {
    tugasInput: async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file', error: err.message });
            }

            const { id_tugas, id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline, waktu_deadline, status } = req.body;
            let file_tugas = req.file ? req.file.filename : null;

            try {
                // Cek apakah sedang mengupdate tugas
                if (id_tugas) {
                    const existingTugas = await modelTugas.dataTugasByid(id_tugas);
                    
                    // Jika file baru tidak diupload, gunakan file yang sudah ada
                    if (!file_tugas && existingTugas && existingTugas.file_tugas) {
                        file_tugas = existingTugas.file_tugas;
                    } else if (file_tugas && existingTugas && existingTugas.file_tugas) {
                        // Jika ada file baru dan file lama, hapus file lama
                        fs.unlink(path.join(storagePath, existingTugas.file_tugas), (unlinkErr) => {
                            if (unlinkErr) console.log('Error deleting old file:', unlinkErr);
                        });
                    }
                }

                // Panggil fungsi upsert dari model untuk menambah/memperbarui data tugas
                await modelTugas.upsertTugas(id_tugas, id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline,waktu_deadline, file_tugas, status);
                res.status(200).json({ message: 'Berhasil menambahkan atau memperbarui tugas!' });

            } catch (error) {
                // Hapus file yang baru diupload jika terjadi error saat proses insert/update
                if (file_tugas && !id_tugas) {
                    fs.unlink(path.join(storagePath, file_tugas), (unlinkErr) => {
                        if (unlinkErr) console.log('Error deleting uploaded file:', unlinkErr);
                    });
                }
                console.log(error);
                res.status(500).json({ message: 'Gagal menambahkan atau memperbarui tugas', error });
            }
        });
    },
    

    pengumpulanInput: async (req, res) => {
        const { id_tugas, id_siswa, tanggal_pengumpulan, file_jawaban, status, nilai } = req.body;
        try {
            await modelTugas.insertTugas(id_tugas, id_siswa, tanggal_pengumpulan, file_jawaban, status, nilai);
            res.status(200).json({ messages: 'Berhasil menambahkan tugas!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Gagal menambahkan data pengumpulan', error });
        }
    },

    tugasPage: async (req, res) => {
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const kelas = await getKelas();
            const rows = await guru.getguru(req, res);
            res.render('guru/tugas/index', { messages, rows, kelas });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ messages: 'Gagal merender halaman' });
        }
    },

     dataTugas : async (req, res) => {
        const nip = req.session.username; // Mengambil nip dari session
        
        try {
            // Memanggil model yang sudah diperbarui untuk menjalankan query update dan select
            const data = await modelTugas.dataTugas(nip);
            
            // Mengirimkan response JSON dengan data tugas
            res.status(202).json({ data, count: data.length });
        } catch (error) {
            // Jika ada error, kirimkan response error dengan status 404
            console.error(error);
            return res.status(404).json({ message: 'Gagal mengambil data tugas' });
        }
    }
    
    , 
    tugasByid : async(req, res) => {
        const {id_tugas} = req.params;
        try {
            const data = await modelTugas.dataTugasByid(id_tugas);
            if(!data){
                req.flash("error", "Data Tugas tidak ditemukan!");
            }
            res.status(202).json({data})
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: 'Gagal mengambil data tugas' });
        }
    },
     tugasUpdate : async (req, res) => {
        const { id_tugas } = req.params;
        const { id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline, waktu_deadline, file_tugas, status } = req.body; 
    
        try {
            const result = await modelTugas.updateTugas(id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, waktu_deadline, tanggal_deadline, file_tugas, status, id_tugas);
            res.status(200).json({ message: 'Tugas berhasil diupdate', result });
        } catch (error) {
            console.error('Error updating tugas:', error);
            res.status(500).json({ message: 'Gagal mengupdate data tugas', error: error.message });
        }
    },
    tugasDetail: async (req, res) => {
        const { id_tugas } = req.params;
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const rows = await guru.getguru(req, res);
            const data = await modelTugas.dataTugasByid(id_tugas);
            if (!data) {
                req.flash("error", "Data Tugas tidak ditemukan!");
            }
            res.render('guru/tugas/detail_tugas', { data, rows, messages });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: 'Gagal mengambil data tugas' });
        }
    },
    pengumpulanTugas : async(req, res)=> {
        const {id_tugas} = req.params
        try {
            const data = await modelTugas.dataPengumpulan(id_tugas);
            res.status(202).json({data, count : data.length})
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: 'Gagal mengambil data tugas' });
        }
    },
    jawaban_Siswa : async(req, res) => {
        const {id_pengumpulan} = req.params
        try {
            
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
            const data = await modelTugas.detailPengumpulan(id_pengumpulan)
            const rows = await guru.getguru(req, res);
            res.render("guru/tugas/jawaban_siswa", {data, rows, messages})
        } catch (error) {
            res.status(500).send({msg: "ada kesalahan", err : error})
        }
    },
    nilaiDetail : async(req, res) => {
        const {id_pengumpulan} = req.params
        try {
            const data = await modelTugas.detailPengumpulan(id_pengumpulan)
            const rows = await guru.getguru(req, res);
            res.status(202).json({data})
        } catch (error) {
            res.status(500).send({msg: "ada kesalahan", err : error})
        }
    },
    inputNilai : async (req, res) => {
        const {id_pengumpulan} = req.params
        const {nilai} = req.body
        try {
            var status = "diterima"
            await modelTugas.updateNilai(id_pengumpulan, nilai, status);
            res.status(202).json({messages : 'berhasil menambahkan nilai' })
        } catch (error) {
            console.log(error)
            res.status(404).json({messages : 'error, gagal memberikan nilai'})
        }
    }

};
