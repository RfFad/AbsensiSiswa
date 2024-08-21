const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware')
const {getPageKelas, getInsertKelas, getDataKelas, getUpdateKelas, getUpdatePageKelas, getDeleteKelas} = require('../controllers/KelasController')

router.get('/', checkRole('guru'), authHeader, async(req, res)=>{
    try {
        res.render('Guru/index')
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/kelas', getPageKelas);
router.post('/insert_kelas', getInsertKelas);
router.get('/data_kelas', getDataKelas);
router.get('/kelas/edit/:id_kelas', getUpdatePageKelas);
router.post('/kelas/delete/:id_kelas', getDeleteKelas);
router.post('/kelas/update/:id_kelas', getUpdateKelas);

module.exports = router;