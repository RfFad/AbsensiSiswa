const {
  getSekolahById,
  updateSekolah,
  getSekolah,
} = require("../../models/models_sekolah");

const getDataSekolah = async (req, res) => {
  try {
    const messages = {
      success: req.flash("success"),
      error: req.flash("error"),
    };
    const row = await getSekolah();
    res.render("admin/sekolah", { row, index: 1, messages });
  } catch (error) {
    res.status(420).json({ error: error.message });
  }
};

const getUpdatePageSekolah = async (req, res) => {
  try {
    const id_sekolah = req.params.id_sekolah;
    const sekolah = await getSekolahById(id_sekolah);
    res.render("admin/edit_sekolah", { sekolah });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updateSekolahData = async (req, res) => {
  try {
    const id_sekolah = req.params.id_sekolah;
    const { nama, kode, email, alamat } = req.body;
    await updateSekolah(id_sekolah, nama, kode, email, alamat);
    req.flash("success", "Data Sekolah berhasil diupdate");
    res.redirect("/admin/sekolah");
  } catch (error) {
    req.flash("error", error.message);
    res.status(500).redirect("/sekolah");
  }
};

module.exports = {
  getUpdatePageSekolah,
  updateSekolahData,
  getDataSekolah,
};
