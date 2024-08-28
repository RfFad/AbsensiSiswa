const {
  InsertMapel,
  getMapel,
  getMapelById,
  UpdateMapel,
  DeleteMapel,
} = require("../../models/models_mapel");
const getDataMapel = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    const row = await getMapel();
    res.render("admin/mapel/mapel", { row, index: 1, messages }); // Removed the leading slash
  } catch (error) {
    res.status(420).json(error);
  }
};

const getPageMapel = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/mapel/crud_mapel", { messages });
  } catch (error) {
    console.error("Error rendering the page:", error);
    res.status(500).send("Server Error");
  }
};

const getInsertMapel = async (req, res) => {
  const { nama_mp } = req.body;

  try {
    // Attempt to insert the new class
    await InsertMapel(nama_mp);
    req.flash("success", "Berhasil menambahkan data!");
    return res.redirect("/admin/data_mapel");
  } catch (error) {
    // If an error occurs, set an error message
    req.flash("error", `Gagal menambahkan data! ${error.message}`);
    return res.redirect("/admin/mapel/create");
  }
};
const getUpdatePageMapel = async (req, res) => {
  const { idm } = req.params;
  try {
    const Mapel = await getMapelById(idm);
    if (!Mapel) {
      req.flash("error", "Data Mapel tidak ditemukan!");
      return res.redirect("/admin/data_mapel");
    }
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/mapel/edit_mapel", { Mapel, messages });
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(400).send("Server Error");
  }
};
const getUpdateMapel = async (req, res) => {
  const { idm } = req.params;
  const { nama_mp } = req.body;
  try {
    await UpdateMapel(idm, nama_mp);
    req.flash("success", "Berhasil memperbarui data!");
    return res.redirect("/admin/data_mapel");
  } catch (error) {
    req.flash("error", `Gagal memperbarui data! ${error.message}`);
    return res.redirect(`/admin/mapel/edit/${idm}`);
  }
};
const getDeleteMapel = async (req, res) => {
  const { idm } = req.params;
  try {
    await DeleteMapel(idm);
    req.flash("success", "Berhasil Menghapus data!");
    return res.redirect("/admin/data_mapel");
  } catch (error) {
    req.flash("error", `Gagal Menghapus data! ${error.message}`);
    return res.redirect("/admin/data_mapel");
  }
};

module.exports = {
  getPageMapel,
  getInsertMapel,
  getDataMapel,
  getUpdatePageMapel,
  getUpdateMapel,
  getDeleteMapel,
};
