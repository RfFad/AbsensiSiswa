const jadwalmodel = require ('../../models/guru/jadwal_model');
const gurumodel = require ('../../models/guru/models_guru');
const hariIna = require('../../configs/hari');
const jadwal_guru = {
    jadwalmengajar : async (req, res) => {
        try {
            const messages = {
            
                success: req.flash('success'),
                error: req.flash('error')
            };
            const rows = await gurumodel.getguru(req, res);
            const row = await jadwalmodel.getJadwal(req, res);
            res.render("guru/jadwal/jadwal_mengajar", {row, rows,currentPath: '/guru/jadwal',messages}) ;
        } catch (error) {
            console.error("Error rendering the page:", error);
      res.status(400).json("Internal Server Error");
        }
    },
   
    
}
module.exports = jadwal_guru