const express = require('express');
const router = express.Router();
const verifyUser = require('../configs/verify');
const authController = require('../controllers/AuthController');


// GET request for the login page
router.get('/', verifyUser.isLogout, authController.login);

// POST request for handling login authentication
router.post('/auth', authController.loginAuth);

// GET request for logout
router.get('/logout', authController.logout);


module.exports = router;
