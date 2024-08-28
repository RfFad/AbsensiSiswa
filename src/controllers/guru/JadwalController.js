const jadwalmodel = require ('../../models/guru/jadwal_model');
const gurumodel = require ('../../models/guru/models_guru')
const jadwal_guru = {
    jadwalmengajar : async (req, res) => {
        try {
            const rows = await gurumodel.getguru(req, res);
            const row = await jadwalmodel.getJadwal(req, res);
            res.render("guru/jadwal/jadwal_mengajar", {row, rows}) ;
        } catch (error) {
            console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
        }
    }
}
module.exports = jadwal_guru