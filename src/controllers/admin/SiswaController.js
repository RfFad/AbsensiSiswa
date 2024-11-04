const { 
  InsertSiswa,
  getSiswa,
  getSiswaById,
  UpdateSiswa,
  DeleteSiswa,
  getInfoSiswa,
  getGrafikSiswa 
} = require("../../models/models_siswa");
const { getKelas } = require("../../models/models_kelas");
const md5 = require("md5");
const tahun_ajar = require("../../models/models_tahunajar");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const ExcelJS=require('exceljs');

// Membuat folder public/images jika belum ada
if (!fs.existsSync(path.join(__dirname,'..', '..', 'public', 'images'))) {
  fs.mkdirSync(path.join(__dirname, '..','..', 'public', 'images'), { recursive: true });
}

// Setup multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..','..', 'public', 'images')); // Tentukan folder penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
  }
});

const upload = multer({ storage: storage }).single('foto');

// Method untuk menambahkan siswa
const ExportDataSiswa = async (req, res) =>{
try {
  
  const kelas = req.query.id_kelas || null;
  const tahunAjar = req.query.idth || null;
  const jk = req.query.jk || null ;
  const tgl_lahir = req.query.tgl_lahir || null ;
  const nama_siswa = req.query.nama_siswa || null;
  const alamat = req.query.alamat || null;
  const nama_wali = req.query.nama_wali || null;
  const pekerjaan_wali = req.query.pekerjaan_wali || null;
  const siswaData = await getSiswa(kelas, tahunAjar, jk, tgl_lahir, nama_siswa, alamat, nama_wali, pekerjaan_wali);

  const workbook =new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data Siswa');

  worksheet.columns = [
    {header: 'NIS', key:'nis', width: 15},
    {header: 'Nama Siswa', key:'nama_siswa', width: 25},
    {header: 'Kelas', key:'nama_kelas', width: 15},
    {header: 'Gender', key:'jk', width: 10},
    {header: 'Tanggal Lahir', key:'tgl_lahir', width: 15},
    {header: 'Nama Wali', key:'nama_wali', width: 25},
    {header: 'Pekerjaan Wali', key:'pekerjaan_wali', width: 25},
    {header: 'Tahun Ajaran', key:'nama_ajaran', width: 20},
  ];
  siswaData.forEach((siswa)=>{
    worksheet.addRow({
      nis: siswa.nis,
      nama_siswa: siswa.nama_siswa,
      nama_kelas: siswa.nama_kelas,
      jk: siswa.jk,
      tgl_lahir: siswa.tgl_lahir,
      nama_wali: siswa.nama_wali,
      pekerjaan_wali: siswa.pekerjaan_wali,
      nama_ajaran: siswa.nama_ajaran
    })
  });
  const filePath = path.join(__dirname, '..','..', 'public', 'excel', 'Data_Siswa.xlsx');

  await workbook.xlsx.writeFile(filePath);
  res.download(filePath, 'Data_Siswa.xlsx', (err) => {
    if (err) {
        res.status(500).send('Terjadi kesalahan saat mengekspor data');
    }

    // Hapus file setelah diunduh
    fs.unlink(filePath, (err) => {
        if (err) console.error(err);
    });
});
} catch (error) {
  res.status(500).send('Terjadi kesalahan saat mengambil data siswa');
  console.log(error)
}
}
const getInsertSiswa = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', error: err });
    }

    const { nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password } = req.body;
    let foto = req.file ? req.file.filename : null;

    try {
      const hashedPassword = md5(password); // Hash password
      await InsertSiswa(
        nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, hashedPassword, foto
      );
      req.flash("success", "Berhasil menambahkan data!");
      return res.redirect("/admin/data_siswa");
    } catch (error) {
      req.flash("error", `Gagal menambahkan data! ${error.message}`);
      return console.log(error)
     // return res.redirect("/admin/siswa");
    }
  });
};
const getSiswaData = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };

    // Ambil daftar kelas untuk select option
    const datakelas = await getKelas();
    const dataTahun = await tahun_ajar.getTahunAjar();
    // Ambil parameter kelas dari query, atau null jika tidak ada
    const kelas = req.query.id_kelas || null;
    const tahunAjar = req.query.idth || null;
    const jk = req.query.jk || null ;
    const tgl_lahir = req.query.tgl_lahir || null ;
    const nama_siswa = req.query.nama_siswa || null;
    const alamat = req.query.alamat || null;
    const nama_wali = req.query.nama_wali || null;
    const pekerjaan_wali = req.query.pekerjaan_wali || null;
    // Ambil data siswa berdasarkan kelas (jika dipilih) atau semua siswa
    const siswakelas = await getSiswa(kelas, tahunAjar, jk, tgl_lahir, nama_siswa, alamat, nama_wali, pekerjaan_wali);

    // Render ke view 'siswa'
    res.render("admin/siswa/siswa", {
      siswakelas, // Mengirimkan data siswa
      index: 1, 
      messages, 
      currentPath: '/admin/data_siswa', 
      selectedKelas: kelas, // Kelas yang dipilih
      datakelas, // Daftar kelas untuk dropdown
      dataTahun
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


const getPageSiswa = async (req, res) => {
  try {
    const tahun_ajaran = await tahun_ajar.getTahunAjar();
    const row = await getKelas();
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/siswa/crud_siswa", { messages, row, currentPath : '/admin/siswa', tahun_ajaran});
  } catch (error) {
    console.error("Error rendering the page:", error);
    res.status(400).send("Server Error");
  }
};



const getUpdatePageSiswa = async (req, res) => {
  const { id_siswa } = req.params;
  try {
    const tahun_ajaran = await tahun_ajar.getTahunAjar()
    const row = await getKelas();
    const siswa = await getSiswaById(id_siswa);
    if (!siswa) {
      req.flash("error", "Data siswa tidak ditemukan!");
      return res.redirect("/admin/data_siswa");
    }
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/siswa/edit_siswa", { siswa, messages, row, currentPath : '/admin/siswa/edit/:id_siswa', tahun_ajaran});
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(400).send("Server Error");
  }
};
const getInfoSiswaNis = async (req, res) => {
  const { nis } = req.params;
  try {
    const siswa = await getInfoSiswa(nis); // Pastikan ini mengembalikan data siswa
    if (!siswa || siswa.length === 0) { // Cek jika siswa tidak ada atau array kosong
      req.flash("error", "Data siswa tidak ditemukan!");
      return res.redirect("/admin/data_siswa");
    }
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.status(200).json({ siswa, messages }); // Ambil data siswa pertama dari array
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(500).json({ error: "Server Error" }); // Kembalikan status 500 untuk kesalahan server
  }
};


const updateSiswa = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      req.flash("error", "Error uploading file!");
      return res.redirect(`/admin/siswa/edit/${req.params.id_siswa}`);
    }

    const { id_siswa } = req.params;
    const { nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password } = req.body;
    let foto = req.file ? req.file.filename : null;

    try {
      // Ambil data siswa untuk mendapatkan data lama
      let siswa = await getSiswaById(id_siswa);
      if (!siswa) {
        req.flash("error", "Data siswa tidak ditemukan!");
        return res.redirect("/admin/data_siswa");
      }

      // Jika tidak ada file foto baru yang diunggah, gunakan foto lama
      if (!foto) {
        foto = siswa.foto; // Gunakan foto lama jika tidak ada foto baru
      } else {
        // Jika ada foto baru, hapus foto lama jika ada
        if (siswa.foto) {
          const oldFotoPath = path.join(__dirname, '..', '..', 'public', 'images', siswa.foto);
          if (fs.existsSync(oldFotoPath)) {
            // Cek apakah foto bukan default, jika ada logika default image
            if (siswa.foto !== 'default.jpg') { 
              fs.unlinkSync(oldFotoPath); // Hapus foto lama
              console.log("Foto lama berhasil dihapus:", oldFotoPath);
            }
          }
        }
      }

      // Jika password diisi, hash password baru. Jika tidak, gunakan password lama.
      const hashedPassword = password ? md5(password) : siswa.password;

      // Update data siswa dengan password yang sudah di-hash (baru atau lama) dan foto
      await UpdateSiswa(
        id_siswa,
        nis,
        nama_siswa,
        tlp,
        tgl_lahir,
        id_kelas,
        idth,
        jk,
        nama_wali,
        alamat,
        pekerjaan_wali,
        hashedPassword,
        foto // Sertakan foto yang diunggah atau foto lama
      );

      req.flash("success", "Berhasil memperbarui data!");
      return res.redirect("/admin/data_siswa");
    } catch (error) {
      req.flash("error", `Gagal memperbarui data! ${error.message}`);
      return res.redirect(`/admin/siswa/edit/${id_siswa}`);
    }
  });
};




const getDeleteSiswa = async (req, res) => {
  const { id_siswa } = req.params;
  try {
    await DeleteSiswa(id_siswa);
    req.flash("success", "Berhasil Menghapus data!");
    return res.redirect("/admin/data_siswa");
  } catch (error) {
    req.flash("error", `Gagal Menghapus data! ${error.message}`);
    return res.redirect("/admin/data_siswa");
  }
};
const getGrafik = async(req, res) => {
  try {
    const SiswaGrafik = await getGrafikSiswa();
    const TahunAjaran = SiswaGrafik.map(row => row.tahun_ajaran)
    const JumlahSiswa = SiswaGrafik.map(row => row.jumlah_siswa)
    console.log('Tahun Ajaran:', TahunAjaran);
    console.log('Jumlah Siswa:', JumlahSiswa);
    res.render('Admin/grafik', {TahunAjaran, JumlahSiswa, currentPath : '', messages:''})
  } catch (error) {
    console.log(error)
    return res.status(404)
  }
}
module.exports = {
  getInsertSiswa,
  getPageSiswa,
  getSiswaData,
  getUpdatePageSiswa,
  updateSiswa,
  getDeleteSiswa,
  getInfoSiswaNis,
  getGrafik,
  ExportDataSiswa
};
