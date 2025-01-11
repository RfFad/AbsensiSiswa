const { 
  InsertSiswa,
  getSiswa,
  getSiswaById,
  UpdateSiswa,
  DeleteSiswa,
  getInfoSiswa,
  getGrafikSiswa,
  getSiswaExport 
} = require("../../models/models_siswa");
const getCount = require('../../models/models_count')
const { getKelas, getKelasByName, updateKenaikan } = require("../../models/models_kelas");
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

const naikKelas = async (req, res) => {
  try {
    const siswaData = await getSiswaExport();

    for (const siswa of siswaData) {
      const { id_siswa, nama_kelas } = siswa;
      const angkaKelas = parseInt(nama_kelas.match(/\d+/)[0]);
      const hurufKelas = nama_kelas.replace(angkaKelas, '');

      let kelasBaru = null;

      if (angkaKelas === 7) {
        kelasBaru = `8${hurufKelas}`;
      } else if (angkaKelas === 8) {
        kelasBaru = `9${hurufKelas}`;
      } else if (angkaKelas === 9) {
        kelasBaru = `alumni`;
      }

      const kelasData = await getKelasByName(kelasBaru);
      if (!kelasData) {
        console.error(`Kelas ${kelasBaru} tidak ditemukan di database.`);
        continue;
      }

      const id_kelas_baru = kelasData.id_kelas;
      await updateKenaikan(id_siswa, { id_kelas: id_kelas_baru });
      console.log(`Siswa ${id_siswa} naik ke kelas ${kelasBaru}`);
    }

    req.flash("success", "Proses kenaikan kelas selesai.");
    res.redirect("/admin/data_siswa");
  } catch (error) {
    console.error("Error saat menaikkan kelas:", error);
    req.flash("error", "Terjadi kesalahan saat menaikkan kelas.");
    res.redirect("/admin/data_siswa");
  }
};

const ExportDataSiswa = async (req, res) => {
  try {
    const kelas = req.query.id_kelas || null;
    const tahunAjar = req.query.idth || null;
    const jk = req.query.jk || null;
    const tgl_lahir = req.query.tgl_lahir || null;
    const nama_siswa = req.query.nama_siswa || null;
    const alamat = req.query.alamat || null;
    const nama_wali = req.query.nama_wali || null;
    const pekerjaan_wali = req.query.pekerjaan_wali || null;
    const siswaData = await getSiswaExport(kelas, tahunAjar, jk, tgl_lahir, nama_siswa, alamat, nama_wali, pekerjaan_wali, (page = 1));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Siswa');

    worksheet.columns = [
      { header: 'NIS', key: 'nis', width: 15 },
      { header: 'Nama Siswa', key: 'nama_siswa', width: 25 },
      { header: 'Kelas', key: 'nama_kelas', width: 15 },
      { header: 'Gender', key: 'jk', width: 10 },
      { header: 'Tanggal Lahir', key: 'tgl_lahir', width: 15 },
      { header: 'Nama Wali', key: 'nama_wali', width: 25 },
      { header: 'Pekerjaan Wali', key: 'pekerjaan_wali', width: 25 },
      { header: 'Tahun Ajaran', key: 'nama_ajaran', width: 20 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    siswaData.forEach((siswa) => {
      worksheet.addRow({
        nis: siswa.nis,
        nama_siswa: siswa.nama_siswa,
        nama_kelas: siswa.nama_kelas,
        jk: siswa.jk,
        tgl_lahir: siswa.tgl_lahir,
        nama_wali: siswa.nama_wali,
        pekerjaan_wali: siswa.pekerjaan_wali,
        nama_ajaran: siswa.nama_ajaran,
      });
    });

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    const filePath = path.join(__dirname, '..', '..', 'public', 'excel', 'Data_Siswa.xlsx');

    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, 'Data_Siswa.xlsx', (err) => {
      if (err) {
        res.status(500).send('Terjadi kesalahan saat mengekspor data');
      }

      fs.unlink(filePath, (err) => {
        if (err) console.error(err);
      });
    });
  } catch (error) {
    res.status(500).send('Terjadi kesalahan saat mengambil data siswa');
    console.log(error);
  }
};

const importDataSiswa = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      req.flash("error", "Error saat mengunggah file!");
      console.log(err);
      return res.redirect("/admin/data_siswa");
    }

    const filePath = req.file.path;

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        throw new Error("Worksheet tidak ditemukan!");
      }

      const siswaData = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;

        const nis = row.getCell(1).value;
        const nama_siswa = row.getCell(2).value;
        const nama_kelas = row.getCell(3).value;
        const jk = row.getCell(4).value;
        const tgl_lahir = row.getCell(5).value;
        const nama_wali = row.getCell(6).value;
        const alamat = row.getCell(7).value;
        const pekerjaan_wali = row.getCell(8).value;
        const tlp = row.getCell(9).value;
        const rawPassword = row.getCell(10).value;
        const nama_ajaran = row.getCell(11).value;

        if (!nis || !nama_siswa || !nama_kelas || !nama_ajaran) {
          console.error(`Baris ${rowNumber}: Data tidak lengkap, diabaikan.`);
          return;
        }

        const tglLahirConverted =
          tgl_lahir instanceof Date ? tgl_lahir : new Date(tgl_lahir);

        siswaData.push({
          nis,
          nama_siswa,
          nama_kelas,
          jk,
          tgl_lahir: tglLahirConverted,
          nama_wali,
          alamat,
          pekerjaan_wali,
          tlp,
          password : rawPassword ? md5(rawPassword) : md5("123"),
          foto: null,
          nama_ajaran,
        });
      });

      for (const siswa of siswaData) {
        const kelas = await getKelasByName(siswa.nama_kelas);
        if (!kelas) {
          console.error(`Kelas '${siswa.nama_kelas}' tidak ditemukan.`);
          continue;
        }

        const tahunAjaran = await tahun_ajar.getTahunAjaranByName(siswa.nama_ajaran);
        if (!tahunAjaran) {
          console.error(`Tahun ajaran '${siswa.nama_ajaran}' tidak ditemukan.`);
          continue;
        }

        await InsertSiswa(
          siswa.nis,
          siswa.nama_siswa,
          siswa.tlp,
          siswa.tgl_lahir,
          kelas.id_kelas,
          tahunAjaran.idth,
          siswa.jk,
          siswa.nama_wali,
          siswa.alamat,
          siswa.pekerjaan_wali,
          siswa.password,
          siswa.foto
        );
      }

      fs.unlinkSync(filePath);

      req.flash("success", "Data siswa berhasil diimpor!");
      res.redirect("/admin/data_siswa");
    } catch (error) {
      console.error("Error saat mengimpor data:", error);
      req.flash("error", "Terjadi kesalahan saat mengimpor data!");
      res.redirect("/admin/data_siswa");
    }
  });
};



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
  const page = parseInt(req.query.page) || 1;
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };

    // Ambil daftar kelas untuk select option
    const datakelas = await getKelas();
    const dataTahun = await tahun_ajar.getTahunAjar();

    // Ambil parameter filter dari query
    const kelas = req.query.id_kelas || null;
    const tahunAjar = req.query.idth || null;
    const jk = req.query.jk || null;
    const tgl_lahir = req.query.tgl_lahir || null;
    const nama_siswa = req.query.nama_siswa || null;
    const alamat = req.query.alamat || null;
    const nama_wali = req.query.nama_wali || null;
    const pekerjaan_wali = req.query.pekerjaan_wali || null;

    // Ambil data siswa dan pagination
    const siswakelas = await getSiswaExport(kelas, tahunAjar, jk, tgl_lahir, nama_siswa, alamat, nama_wali, pekerjaan_wali, page);
    const countSiswa = await getCount.CountSiswa();
    // Render ke view 'siswa'
    res.render("admin/siswa/siswa", {
      siswakelas: siswakelas, // Data siswa
      index: 1,
      messages,
      currentPath: '/admin/data_siswa',
      selectedKelas: kelas,
      datakelas, // Daftar kelas
      dataTahun, // Daftar tahun ajar
      page,
      countSiswa : countSiswa, // Halaman saat ini
      totalPages: siswakelas.totalPages, // Total halaman
      currentPage: siswakelas.currentPage, // Halaman saat ini dari response
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
  naikKelas,
  getInsertSiswa,
  getPageSiswa,
  getSiswaData,
  getUpdatePageSiswa,
  updateSiswa,
  getDeleteSiswa,
  getInfoSiswaNis,
  getGrafik,
  ExportDataSiswa,
  importDataSiswa
};
