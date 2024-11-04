const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware



router.get('/', checkRole('siswa'), authHeader, getDashboard)

router.get('/pagesiswa', async(req, res)=> {
    try {
        res.render("siswa/newpage")
    } catch (error) {
        res.status(500).send({msg: "ada kesalahan", err : error})
    }
})
router.get('/jadwal', jadwal_siswa.renderJadwal);
router.get('/data_jadwal', jadwal_siswa.dataJadwal);


module.exports = router;