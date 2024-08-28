const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware');  // assuming authHeader is another middleware


router.get('/', checkRole('siswa'), authHeader, async(req, res)=>{
    try {
        res.render('Siswa/index')
    } catch (error) {
        res.status(400).json(error);
    }
})



module.exports = router;