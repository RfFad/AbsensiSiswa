const {
  InsertHari,
  UpdateHari,
  HariById,
  getHari,
  DeleteHari,
} = require("../../models/models_hari");

const getDataHari = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    const row = await getHari();
    res.render("admin/hari", { row, index: 1, messages }); // Removed the leading slash
  } catch (error) {
    res.status(420).json(error);
  }
};

const getInsertHari = async (req, res) => {
  const { hari } = req.body;
  try {
    await InsertHari(hari);
    req.flash("success", "Berhasil menambahkan data!");
    return res.redirect("/admin/hari");
  } catch (error) {
    req.flash("error", `Gagal menambahkan data! ${error.message}`);
    return res.redirect("/admin/hari");
  }
};
const getPageHari = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/crud_hari", { messages });
  } catch (error) {
    console.error("Error rendering the page:", error);
    res.status(500).send("Server Error");
  }
};
const getUpdatePageHari = async (req, res) => {
  const { idh } = req.params;
  try {
    const hari = await HariById(idh);
    if (!hari) {
      req.flash("error", "Data Kelas tidak ditemukan!");
      return res.redirect("/admin/data_hari");
    }
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    res.render("admin/edit_hari", { hari, messages });
  } catch (error) {
    console.error("Error rendering the update page:", error);
    res.status(400).send("Server Error");
  }
};
const getUpdateHari = async (req, res) => {
  const { idh } = req.params;
  const { hari } = req.body;
  try {
    await UpdateHari(idh, hari);
    req.flash("success", "Berhasil memperbarui data!");
    return res.redirect("/admin/data_hari");
  } catch (error) {
    req.flash("error", `Gagal memperbarui data! ${error.message}`);
    return res.redirect(`/admin/hari/edit/${idh}`);
  }
};
const getDeleteHari = async (req, res) => {
  const { idh } = req.params;
  try {
    await DeleteHari(idh);
    req.flash("success", "Berhasil menghapus data!");
    return res.redirect("/admin/data_hari");
  } catch (error) {
    req.flash("error", `Gagal menghapus data! ${error.message}`);
    return res.redirect("/admin/data_hari");
  }
};

module.exports = {
  getInsertHari,
  getPageHari,
  getDataHari,
  getDeleteHari,
  getUpdateHari,
  getUpdatePageHari,
};
