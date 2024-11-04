const jadwal_siswa = require("../../models/siswa/models_jadwal");

module.exports = {
    dataJadwal : async(req, res) =>{
        try {
            const {data, count} = await jadwal_siswa.jadwal(req, res);
            res.status(202).json({data, count})
        } catch (error) {
            console.log(error)
            return res.status(404)
        }
    },
    renderJadwal : async(req, res) =>{
        try {
            res.render("siswa/jadwal/jadwal")
        } catch (error) {
            console.log(error)
            return res.status(404)
        }
    }
}