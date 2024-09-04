const jadwalmodel = require("../../models/models_jadwal");
const { getGuru } = require("../../models/models_guru");
const { getKelas } = require("../../models/models_kelas");
const { getMapel } = require("../../models/models_mapel");
const { getHari } = require("../../models/models_hari");
const jadwal = {
  senin: async (req, res) => {
    try {
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      const row = await jadwalmodel.getSenin();
      res.render("admin/jadwal/senin", { row, messages, currentPath : '/admin/data_jadwal', currentPath : '/admin/data_jadwal' });
    } catch (error) {
      console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
    }
  },
  selasa: async (req, res) => {
    try {
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      const row = await jadwalmodel.getSelasa();
      res.render("admin/jadwal/selasa", { row, messages, currentPath : '/admin/data_jadwal' });
    } catch (error) {
      console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
    }
  },
  rabu: async (req, res) => {
    try {
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      const row = await jadwalmodel.getRabu();
      res.render("admin/jadwal/rabu", { row, messages, currentPath : '/admin/data_jadwal' });
    } catch (error) {
      console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
    }
  },
  kamis: async (req, res) => {
    try {
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      const row = await jadwalmodel.getKamis();
      res.render("admin/jadwal/kamis", { row, messages, currentPath : '/admin/data_jadwal' });
    } catch (error) {
      console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
    }
  },
  jumat: async (req, res) => {
    try {
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      const row = await jadwalmodel.getJumat();
      res.render("admin/jadwal/jumat", { row, messages, currentPath : '/admin/data_jadwal' });
    } catch (error) {
      console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
    }
  },

  getPageInsert: async (req, res) => {
    try {
      const guru = await getGuru();
      const kelas = await getKelas();
      const mapel = await getMapel();
      const hari = await getHari();
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      res.render("admin/jadwal/crud_jadwal", {
        messages,
        guru,
        kelas,
        mapel,
        hari,
        currentPath : '/admin/jadwal'
      });
    } catch (error) {
      console.error("Error rendering the page:", error);
      res.status(400).send("Server Error");
    }
  },
  getInsertJadwal: async (req, res) => {
    const { idh, idg, idk, idm, jam_mulai, jam_selesai } = req.body;
    try {
      await jadwalmodel.InsertJadwal(
        idh,
        idg,
        idk,
        idm,
        jam_mulai,
        jam_selesai
      ); // Use the hashed password
      req.flash("success", "Berhasil menambahkan data!");
      return res.redirect("/admin/jadwal/senin");
    } catch (error) {
      req.flash("error", `Gagal menambahkan data! ${error.message}`);
      return res.redirect("/admin/jadwal");
    }
  },
  getUpdatePage: async (req, res) => {
    const { idj } = req.params;
    try {
      const jadwal = await jadwalmodel.JadwalById(idj);
      const guru = await getGuru();
      const kelas = await getKelas();
      const mapel = await getMapel();
      const hari = await getHari();
      if (!jadwal) {
        req.flash("error", "Data jadwal tidak ditemukan!");
        return res.redirect("/admin/jadwal/senin");
      }
      const messages = {
        success: req.flash("success"),
        error: req.flash("error"),
      };
      res.render("admin/jadwal/edit", {
        jadwal,
        guru,
        kelas,
        mapel,
        hari,
        messages,
        currentPath : '/admin/jadwal/edit/:idj'
      });
    } catch (error) {
      console.error("Error rendering the update page:", error);
      res.status(400).send("Server Error");
    }
  },
  getUpdateInsert: async (req, res) => {
    const { idj } = req.params;
    const { idh, idg, idk, idm, jam_mulai, jam_selesai } = req.body;
    try {
      await jadwalmodel.UpdateJadwal(
        idj,
        idh,
        idg,
        idk,
        idm,
        jam_mulai,
        jam_selesai
      ); // Use the hashed password
      req.flash("success", "Berhasil memperbarui data!");
      return res.redirect("/admin/jadwal/senin");
    } catch (error) {
      req.flash("error", `Gagal memperbarui data! ${error.message}`);
      return res.redirect(`/admin/jadwal/edit/${idj}`);
    }
  },
  getDelete: async (req, res) => {
    const { idj } = req.params;
    try {
      await jadwalmodel.DeleteJadwal(idj);
      req.flash("success", "Berhasil menghapus data!");
      return res.redirect("/admin/jadwal/senin");
    } catch (error) {
      req.flash("error", `Gagal menghapus data! ${error.message}`);
      return res.redirect(`/admin/jadwal/delete/${idj}`);
    }
  },
};
module.exports = jadwal;
