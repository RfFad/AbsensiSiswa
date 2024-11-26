const mysql = require('mysql');
const gurumodel = require('../../models/guru/models_guru');
const jadwal = require('../../models/guru/jadwal_model');
const {getSiswa, getSiswaByNis, getSiswaByGuru} = require('../../models/models_siswa');
const { getKelas } = require("../../models/models_kelas");
const tahun_ajar = require("../../models/models_tahunajar");
const {getRiwayatBySiswa} = require("../../models/models_riwayat")
const {
    
    getGuruById,
    
  } = require("../../models/models_guru");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
//untuk upload foto
if (!fs.existsSync(path.join(__dirname,'..', '..', 'public', 'fp_guru'))) {
    fs.mkdirSync(path.join(__dirname, '..','..', 'public', 'fp_guru'), { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..','..', 'public', 'fp_guru')); // Tentukan folder penyimpanan
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
    }
  });
  const upload = multer({ storage: storage }).single('foto');
  //
const {
    getSekolah
  } = require("../../models/models_sekolah");
const connect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "absensi_app"
});

module.exports = {
    async updateGuru(req, res) {
        upload(req, res, async (err) => { 
            if (err) {
                return res.status(500).json({ message: 'Error uploading file', error: err });
              }
          
        const { id_guru } = req.params;
        const { nama_guru, jk, jabatan, alamat, tlp } = req.body;
        let foto = req.file ? req.file.filename : null; // Ambil nama file jika ada
    
        try {
            let guru = await getGuruById(id_guru); // Ambil data guru berdasarkan ID
    
            // Jika tidak ada foto baru, gunakan foto lama
            if (!foto) {
                foto = guru.foto;
            } else {
                // Jika ada foto lama dan foto bukan default, hapus foto lama
                if (guru.foto && guru.foto !== 'default.jpg') {
                    const oldFotoPath = path.join(__dirname, '..', '..', 'public', 'fp_guru', guru.foto);
                    if (fs.existsSync(oldFotoPath)) {
                        fs.unlinkSync(oldFotoPath); // Hapus foto lama
                        console.log("Foto lama berhasil dihapus:", oldFotoPath);
                    }
                }
            }
    
            // Update data guru dengan data yang baru
            await gurumodel.UpdateGuru(id_guru, nama_guru, jk, jabatan, alamat, tlp, foto);
    
            // Flash message sukses dan redirect
            req.flash("success", "Berhasil memperbarui data!");
            return res.redirect(`/guru`); // Redirect ke halaman detail guru atau yang sesuai
        } catch (error) {
            // Flash message error dan redirect
            console.log(error)
            req.flash("error", `Gagal memperbarui data! ${error.message}`);
            return res.redirect(`/guru`); // Redirect ke halaman yang sesuai
        }
    })
    },
    async getDashboard(req, res) {
        const username = req.session.username; // Assuming the username is the NIP of the guru

        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
            const sekolah = await getSekolah();
            const rows = await gurumodel.getguru(req, res);
            const { results, count } = await jadwal.getJadwal(req, res);
            connect.getConnection(function (err, connection) {
                if (err) {
                    console.error('Database connection error:', err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }

                connection.query(
                    `SELECT * FROM guru WHERE nip = ?`, [username],
                    function (error, results) {
                        connection.release();
                        if (error) {
                            console.error(error);
                            return res.status(500).json({
                                status: 'error',
                                message: 'Internal server error'
                            });
                        }

                        if (results.length > 0) {
                            res.render('guru/newpage', {
                                currentPath: '/guru' ,
                                rows,
                                sekolah,
                                messages,
                                jdwl : count,
                                guru: results[0], // Passing the guru profile data to the view
                                colorFlash: req.flash('color'),
                                statusFlash: req.flash('status'),
                                pesanFlash: req.flash('message'),
                            });
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Guru not found');
                            res.redirect('/login');
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Error in getting guru data:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },
    async getSiswa(req, res) {
        try {
            const dataTahun = await tahun_ajar.getTahunAjar();
            const datakelas = await getKelas();
            const kelas = req.query.id_kelas || null;
            const tahunAjar = req.query.idth || null;
            const jk = req.query.jk || null ;
            const tgl_lahir = req.query.tgl_lahir || null ;
            const nama_siswa = req.query.nama_siswa || null;
            const alamat = req.query.alamat || null;
            const nama_wali = req.query.nama_wali || null;
            const pekerjaan_wali = req.query.pekerjaan_wali || null;
            let siswa = await getSiswaByGuru(kelas, tahunAjar, jk, tgl_lahir, nama_siswa, alamat, nama_wali, pekerjaan_wali)
            res.status(200).json({ data: siswa,  datakelas, dataTahun});
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Data siswa tidak ditemukan" });
        }
    },
    
    async getPageSiswa (req, res) {
        try {
            const dataTahun = await tahun_ajar.getTahunAjar();
            const datakelas = await getKelas();
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
              const rows = await gurumodel.getguru(req, res);
            res.render("guru/data_siswa", {title : "Data Siswa Ajar", messages, rows, datakelas, dataTahun})
        } catch (error) {
            console.log(error)
            res.status(402)
        }
    },
    async riwayatSiswa (req, res) {
        const {nis} = req.params
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
            
            const rows = await gurumodel.getguru(req, res);
            const data = await getRiwayatBySiswa(nis);
            const siswa = await getSiswaByNis(nis)
            res.render("guru/riwayat_siswa", {rows, messages, data, siswa})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    },
    async dataRiwayat(req, res){
        const {nis} = req.params
        try {
            const data = await getRiwayatBySiswa()
            res.status(202).json({data})
        } catch (error) {
            console.log(error)
            res.status(404)
        }
    }
};
// async getSiswa(req, res) {
//     const nip = req.session.username;
//     try {
//         let siswa = await gurumodel.getDataSiswa(nip);
        
//         // Hilangkan duplikat berdasarkan id_siswa
//         const uniqueSiswa = siswa.filter((value, index, self) =>
//             index === self.findIndex((t) => t.id_siswa === value.id_siswa)
//         );

//         res.status(200).json({ data: uniqueSiswa });
//     } catch (error) {
//         console.error(error);
//         res.status(404).json({ message: "Data siswa tidak ditemukan" });
//     }
// },