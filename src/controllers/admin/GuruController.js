const {
  InsertGuru,
  getGuru,
  getGuruById,
  UpdateGuru,
  DeleteGuru,
  getInfoGuru
} = require("../../models/models_guru");
const {getMapel, getMapelByName} = require("../../models/models_mapel");
const jadwal = require("../../models/models_jadwal")
const md5 = require("md5");
const tahun_ajar = require("../../models/models_tahunajar");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const ExcelJS = require('exceljs');
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
//metod guru
const ExportDataGuru = async (req, res) =>{
  try {
    
    const nama_guru = req.query.nama_guru || null;
    const alamat = req.query.alamat || null;
    const jk = req.query.jk || null;
    const nip= req.query.nip || null;
    const jabatan = req.query.jabatan || null;
    const nama_mp = req.query.nama_mp || null;
    
    const guruData = await getGuru(nama_guru, alamat, jk, jabatan, nama_mp, nip);
  
    const workbook =new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data guru');
  
    worksheet.columns = [
      {header: 'NIP', key:'nip', width: 15},
      {header: 'Nama guru', key:'nama_guru', width: 25},
      {header: 'Jabatan', key:'jabatan', width: 20},
      {header: 'Mapel Ajar', key:'nama_mp', width: 20},
      {header: 'Tlp', key:'tlp', width: 20},
      {header: 'Alamat', key:'alamat', width: 30},
      {header: 'Gender', key:'jk', width: 15},
    ];
    guruData.forEach((guru)=>{
      worksheet.addRow({
        nip: guru.nip,
        nama_guru: guru.nama_guru,
        jabatan: guru.jabatan,
        nama_mp: guru.nama_mp,
        tlp :guru.tlp,
        alamat : guru.alamat,
        jk: guru.jk
      })
    });
    const filePath = path.join(__dirname, '..','..', 'public', 'excel', 'Data_Guru.xlsx');
  
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, 'Data_Guru.xlsx', (err) => {
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
const importGuru = async(req, res)=>{
  upload(req, res, async (err) => {
    if (err) {
      req.flash("error", "Error saat mengunggah file!");
      console.log(err);
      return res.redirect("/admin/data_siswa");
    }

    const filePath = req.file.path;

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath)

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error("Worksheet tidak ditemukan!");
    }
    const guruData =[];

    worksheet.eachRow((row, rowNumber) => {
      if(rowNumber === 1) return;

      const nip = row.getCell(1).value;
      const nama_guru = row.getCell(2).value;
      const nama_mp = row.getCell(3).value;
      const jk = row.getCell(4).value;
      const jabatan = row.getCell(5).value;
      const alamat = row.getCell(6).value;
      const tlp = row.getCell(7).value;
      const passwordMd5 = row.getCell(8).value;
    
    guruData.push({
      nip,
      nama_guru,
      nama_mp,
      jk,
      jabatan,
      alamat,
      tlp,
      password : passwordMd5 ? md5(passwordMd5) : md5("12345"),
      foto : null

    })
  })
  for (const guru of guruData){
    const nama_mp = await getMapelByName(guru.nama_mp)
    if (!nama_mp) {
      console.error(`mapel '${guru.nama_mp}' tidak ditemukan.`);
      continue;
    }
    await InsertGuru(
      guru.nip,
      guru.nama_guru, 
      nama_mp.idm, 
      guru.jk, 
      guru.jabatan, 
      guru.alamat, 
      guru.tlp, 
      guru.password, 
      guru.foto
    )
  }
  fs.unlinkSync(filePath);

  req.flash("success", "Data guru berhasil diimpor!");
  res.redirect("/admin/data_guru");
  } catch (error) {
    console.error("Error saat mengimpor data:", error);
      req.flash("error", "Terjadi kesalahan saat mengimpor data!");
      res.redirect("/admin/data_guru");
  }
})
}
const getGuruData = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    const mapel = await getMapel()
    const jk = req.query.jk || null;
    const nip= req.query.nip || null;
    const nama_guru = req.query.nama_guru || null;
    const alamat = req.query.alamat || null;
    const jabatan = req.query.jabatan || null;
    const nama_mp = req.query.nama_mp || null;
    const row = await getGuru(nama_guru, alamat, jk, jabatan, nama_mp, nip);
    res.render("admin/guru/guru", { row, index: 1, messages, currentPath: '/admin/data_guru', mapel});
  } catch (error) {
    res.status(500).json(error);
  }
};
const getInfoGuruNip = async(req, res) => {
  const {nip} = req.params
  try {
    const guru = await getInfoGuru(nip)
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.status(200).json ({guru, messages})
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(500).json({ error: "Server Error" });
  }
}
const getPageGuru = async (req, res) => {
  try {
    const mapel = await getMapel()
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/guru/crud_guru", { messages, currentPath: '/admin/guru', mapel });
  } catch (error) {
    console.error("Error rendering the page:", error);
    res.status(400).send("Server Error");
  }
};

const getInsertGuru = async (req, res) => {
  upload(req, res, async (err) => { 
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', error: err });
    }

  const { nip, nama_guru, idm, jk, jabatan, alamat, tlp, password } = req.body;
  let foto = req.file ? req.file.filename : null;
  try {
    const hashedPassword = md5(password); // Hash the password using MD5
    await InsertGuru(nip, nama_guru, idm, jk, jabatan, alamat, tlp, hashedPassword, foto); // Use the hashed password
    req.flash("success", "Berhasil menambahkan data!");
    return res.redirect("/admin/data_guru");
  } catch (error) {
    req.flash("error", `Gagal menambahkan data! ${error.message}`);
    return res.redirect("/admin/guru");
  }
});
};

const getUpdatePage = async (req, res) => {
  const { id_guru } = req.params;
  try {
    const mapel = await getMapel()
    const guru = await getGuruById(id_guru);
    if (!guru) {
      req.flash("error", "Data guru tidak ditemukan!");
      return res.redirect("/admin/data_guru");
    }
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/guru/edit_guru", { mapel, guru, messages, currentPath : '/admin/guru/edit/:id_guru' });
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(400).send("Server Error");
  }
};

const updateGuru = async (req, res) => {
  upload(req, res, async (err) => { 
  const { id_guru } = req.params;
  const { nip, nama_guru, idm, jk, jabatan, alamat, tlp, password } = req.body;
  let foto = req.file ? req.file.filename : null;
  try {   
    // Ambil data guru berdasarkan id_guru
    let guru = await getGuruById(id_guru);
    if (!foto) {
      foto = guru.foto; // Gunakan foto lama jika tidak ada foto baru
    } else {
    if (guru.foto) {
      const oldFotoPath = path.join(__dirname, '..', '..', 'public', 'fp_guru', guru.foto);
      if (fs.existsSync(oldFotoPath)) {
        // Cek apakah foto bukan default, jika ada logika default image
        if (guru.foto !== 'default.jpg') { 
          fs.unlinkSync(oldFotoPath); // Hapus foto lama
          console.log("Foto lama berhasil dihapus:", oldFotoPath);
        }
      }
    }
  }
    // Hash password hanya jika ada perubahan password
    const hashedPassword = password ? md5(password) : guru.password;

    // Update data di tabel guru
    await UpdateGuru(
      id_guru,
      nip,
      nama_guru,
      idm, // id_mapel baru untuk guru
      jk,
      jabatan,
      alamat,
      tlp,
      hashedPassword,
      foto
    );

    // Update juga id_mapel di tabel jadwal berdasarkan id_guru
    await jadwal.updateIdMapelByGuruId(id_guru, idm);

    req.flash("success", "Berhasil memperbarui data!");
    return res.redirect("/admin/data_guru");
  } catch (error) {
    console.log(error)
    req.flash("error", `Gagal memperbarui data! ${error.message}`);
    return res.redirect(`/admin/guru/edit/${id_guru}`);
  }
})
};


const getDeleteGuru = async (req, res) => {
  const { id_guru } = req.params;
  try {
    await DeleteGuru(id_guru);
    req.flash("success", "Berhasil Menghapus data!");
    return res.redirect("/admin/data_guru");
  } catch (error) {
    req.flash("error", `Gagal Menghapus data! ${error.message}`);
    return res.redirect("/admin/data_guru");
  }
};

module.exports = {
  getInsertGuru,
  getPageGuru,
  getGuruData,
  getUpdatePage,
  updateGuru,
  getDeleteGuru,
  getInfoGuruNip,
  ExportDataGuru,
  importGuru
};
