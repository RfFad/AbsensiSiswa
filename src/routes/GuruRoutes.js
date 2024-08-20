const express = require('express');
const router = express.Router();
const { checkRole } = require('../controllers/AuthController');
const verifyUser = require('../configs/verify');
const {authHeader} = require('../configs/jwtMiddleware')

router.get('/', checkRole('guru'), authHeader, async(req, res)=>{
    try {
        res.render('Guru/index')
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;