var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  try {
    res.render('index', {title: "Admin | Index"});
  } catch (error) {
    res.status(400).send({message: "error", err: error});
  }
  

})

module.exports = router;
