const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware
const {getDashboard} = require ('../controllers/siswa/DashboardController');


router.get('/', checkRole('siswa'), authHeader, getDashboard)

router.get('/pagesiswa', async(req, res)=> {
    try {
        res.render("siswa/newpage")
    } catch (error) {
        res.status(500).send({msg: "ada kesalahan", err : error})
    }
})


module.exports = router;