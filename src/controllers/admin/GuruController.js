const {
  InsertGuru,
  getGuru,
  getGuruById,
  UpdateGuru,
  DeleteGuru,
  getInfoGuru
} = require("../../models/models_guru");
const {getMapel} = require("../../models/models_mapel");
const jadwal = require("../../models/models_jadwal")
const md5 = require("md5"); // Import the MD5 module

const getGuruData = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    const row = await getGuru();
    res.render("admin/guru/guru", { row, index: 1, messages, currentPath: '/admin/data_guru'});
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
  const { nip, nama_guru, idm, jk, jabatan, alamat, tlp, password } = req.body;
  try {
    const hashedPassword = md5(password); // Hash the password using MD5
    await InsertGuru(nip, nama_guru, idm, jk, jabatan, alamat, tlp, hashedPassword); // Use the hashed password
    req.flash("success", "Berhasil menambahkan data!");
    return res.redirect("/admin/data_guru");
  } catch (error) {
    req.flash("error", `Gagal menambahkan data! ${error.message}`);
    return res.redirect("/admin/guru");
  }
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
  const { id_guru } = req.params;
  const { nip, nama_guru, idm, jk, jabatan, alamat, tlp, password } = req.body;

  try {
    // Ambil data guru berdasarkan id_guru
    let guru = await getGuruById(id_guru);

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
      hashedPassword
    );

    // Update juga id_mapel di tabel jadwal berdasarkan id_guru
    await jadwal.updateIdMapelByGuruId(id_guru, idm);

    req.flash("success", "Berhasil memperbarui data!");
    return res.redirect("/admin/data_guru");
  } catch (error) {
    req.flash("error", `Gagal memperbarui data! ${error.message}`);
    return res.redirect(`/admin/guru/edit/${id_guru}`);
  }
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
  getInfoGuruNip
};
