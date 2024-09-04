const {
  InsertKelas,
  getKelas,
  getKelasById,
  UpdateKelas,
  DeleteKelas,
} = require("../../models/models_kelas");
const getDataKelas = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    const row = await getKelas();
    res.render("admin/kelas/kelas", { row, index: 1, messages, currentPath : '/admin/data_kelas' }); // Removed the leading slash
  } catch (error) {
    res.status(420).json(error);
  }
};

const getPageKelas = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/kelas/crud_kelas", { messages, currentPath : '/admin/kelas' });
  } catch (error) {
    console.error("Error rendering the page:", error);
    res.status(500).send("Server Error");
  }
};

const getInsertKelas = async (req, res) => {
  const { nama_kelas } = req.body;

  try {
    // Attempt to insert the new class
    await InsertKelas(nama_kelas);
    req.flash("success", "Berhasil menambahkan data!");
    return res.redirect("/admin/data_kelas");
  } catch (error) {
    // If an error occurs, set an error message
    req.flash("error", `Gagal menambahkan data! ${error.message}`);
    return res.redirect("/admin/data_kelas");
  }
};
const getUpdatePageKelas = async (req, res) => {
  const { id_kelas } = req.params;
  try {
    const kelas = await getKelasById(id_kelas);
    if (!kelas) {
      req.flash("error", "Data Kelas tidak ditemukan!");
      return res.redirect("/admin/data_kelas");
    }
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/kelas/edit_kelas", { kelas, messages, currentPath : '/admin/kelas/edit/:id_kelas' });
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(400).send("Server Error");
  }
};
const getUpdateKelas = async (req, res) => {
  const { id_kelas } = req.params;
  const { nama_kelas } = req.body;
  try {
    await UpdateKelas(id_kelas, nama_kelas);
    req.flash("success", "Berhasil memperbarui data!");
    return res.redirect("/admin/data_kelas");
  } catch (error) {
    req.flash("error", `Gagal memperbarui data! ${error.message}`);
    return res.redirect(`/admin/kelas/edit/${id_kelas}`);
  }
};
const getDeleteKelas = async (req, res) => {
  const { id_kelas } = req.params;
  try {
    await DeleteKelas(id_kelas);
    req.flash("success", "Berhasil menghapus data!");
    return res.redirect("/admin/data_kelas");
  } catch (error) {
    req.flash("error", `Gagal menghapus data! ${error.message}`);
    return res.redirect("/admin/data_kelas");
  }
};

module.exports = {
  getPageKelas,
  getInsertKelas,
  getDataKelas,
  getUpdatePageKelas,
  getUpdateKelas,
  getDeleteKelas,
};
