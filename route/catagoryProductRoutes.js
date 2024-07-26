const express = require('express');
const router = express.Router();


const catagoryProductCotroller = require('../controller/catagoryProductCotroller.js')

router.post('/saveCatagory', catagoryProductCotroller.saveCatagory);

router.get('/getCatagory', catagoryProductCotroller.getCatagory);

router.get('/createCatagory', catagoryProductCotroller.createCatagory);

module.exports = router



